// src/reports/reports.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { In, Repository } from 'typeorm';
import { Report } from 'src/entities/report.entity';
import { Account } from 'src/entities/account.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/User.entity';
import { ReportWL } from 'src/entities/reportWL.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(ReportWL)
    private readonly reportWLRepository: Repository<ReportWL>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByUserId(userId: string): Promise<Report[]> {
    // Проверяем, существует ли пользователь
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Получаем все аккаунты пользователя
    const accounts = user.accounts.map((account) => account.id);

    // Находим все отчеты, связанные с этими аккаунтами
    const reports = await this.reportRepository.find({
      where: { account: { id: In(accounts) } },
      relations: ['account', 'account.user', 'account.wallets', 'project'],
    });

    return reports;
  }

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const { projectId, accountId, files, title, userId } = createReportDto;

    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    // Опционально проверяем существование пользователя по userId
    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    }

    const report = this.reportRepository.create({
      title,
      project,
      account,
      files,
    });

    return this.reportRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find({
      relations: [
        'account',
        'account.user',
        'account.wallets',
        'project',
        'account.credentials',
      ],
    });
  }

  async findOne(id: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);
    if (updateReportDto.status) {
      report.status = updateReportDto.status;
    }
    return this.reportRepository.save(report);
  }

  async remove(id: string): Promise<void> {
    const result = await this.reportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
  }
  async findByUserIdCombined(userId: string): Promise<(Report | ReportWL)[]> {
    // Check if user exists
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Get all user accounts
    const accounts = user.accounts.map((account) => account.id);

    // Find all reports related to these accounts
    const reports = await this.reportRepository.find({
      where: { account: { id: In(accounts) } },
      relations: ['account', 'account.user', 'account.wallets', 'project'],
    });

    // Find all ReportWL related to user
    const reportWLs = await this.reportWLRepository
      .createQueryBuilder('reportWL')
      .innerJoin('reportWL.account', 'account')
      .innerJoin('account.user', 'user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('reportWL.wallet', 'wallet')
      .leftJoinAndSelect('reportWL.project', 'project')
      .getMany();

    // Map reports to include a type field
    const mappedReports = reports.map((report) => ({
      ...report,
      type: 'common',
    }));

    // Map ReportWLs to include a type field
    const mappedReportWLs = reportWLs.map((reportWL) => ({
      ...reportWL,
      type: 'wl',
    }));

    // Combine both arrays and sort them by created_at
    const combinedReports = [...mappedReports, ...mappedReportWLs].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return combinedReports;
  }
}
