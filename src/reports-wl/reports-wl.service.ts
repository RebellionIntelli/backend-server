// src/reports/reports-wl.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ReportWL } from 'src/entities/reportWL.entity';
import { Account } from 'src/entities/account.entity';
import { Project } from 'src/entities/project.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { CreateReportsWLDto } from './dto/create-reports-wl.dto';
import { UpdateReportWLDto } from './dto/update-reports-wl.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ReportsWLService {
  constructor(
    @InjectRepository(ReportWL)
    private readonly reportWLRepository: Repository<ReportWL>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Wallet)
    private readonly walletsRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createReportWLDto: CreateReportsWLDto): Promise<ReportWL> {
    const { projectId, accountId, walletId, files, title } = createReportWLDto;

    // Validate existence of related entities
    const [project, account, wallet] = await Promise.all([
      this.projectsRepository.findOne({ where: { id: projectId } }),
      this.accountsRepository.findOne({ where: { id: accountId } }),
      this.walletsRepository.findOne({ where: { id: walletId } }),
    ]);

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }

    const reportWL = this.reportWLRepository.create({
      title,
      project,
      account,
      wallet,
      files,
    });

    return this.reportWLRepository.save(reportWL);
  }
  async findByUserId(userId: string): Promise<ReportWL[]> {
    // Find the user and their account
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Get all accounts of the user
    const accounts = user.accounts.map((account) => account.id);

    // Find all reportWLs associated with these accounts
    const reportWLs = await this.reportWLRepository.find({
      where: { account: { id: In(accounts) } },
      relations: ['account', 'account.user', 'account.wallets', 'project'],
    });

    return reportWLs;
  }
  async findAll(): Promise<ReportWL[]> {
    return this.reportWLRepository.find({
      relations: [
        'account',
        'account.user',
        'account.wallets',
        'project',
        'account.credentials',
      ],
    });
  }

  async findOne(id: string): Promise<ReportWL> {
    const reportWL = await this.reportWLRepository.findOne({ where: { id } });
    if (!reportWL) {
      throw new NotFoundException(`ReportWL with ID ${id} not found`);
    }
    return reportWL;
  }

  async update(
    id: string,
    updateReportWLDto: UpdateReportWLDto
  ): Promise<ReportWL> {
    const reportWL = await this.findOne(id);
    if (updateReportWLDto.status) {
      reportWL.status = updateReportWLDto.status;
    }
    return this.reportWLRepository.save(reportWL);
  }

  async remove(id: string): Promise<void> {
    const result = await this.reportWLRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ReportWL with ID ${id} not found`);
    }
  }
}
