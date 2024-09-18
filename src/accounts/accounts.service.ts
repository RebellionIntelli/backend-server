import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async findByUserId(userId: string): Promise<Account[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['accounts'], // Загружаем связанные аккаунты
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Загружаем полные данные аккаунтов с их связями
    const accounts = await this.accountRepository.find({
      where: { user: { id: userId } },
      relations: ['credentials', 'wallets', 'user.telegram'], // Добавляем необходимые связи
    });

    return accounts;
  }
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const user = await this.userRepository.findOne({
      where: { id: createAccountDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const account = this.accountRepository.create({
      ...createAccountDto,
      user,
    });

    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({
      relations: ['credentials', 'wallets', 'user.telegram'],
    });
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['credentials', 'wallets', 'user'],
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return account;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto
  ): Promise<Account> {
    const account = await this.accountRepository.preload({
      id,
      ...updateAccountDto,
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return this.accountRepository.save(account);
  }

  async remove(id: string): Promise<void> {
    const result = await this.accountRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
  }
}
