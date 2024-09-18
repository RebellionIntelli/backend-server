import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Telegram } from 'src/entities/telegram.entity';
import { Meta } from 'src/entities/meta.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Telegram)
    private readonly telegramRepository: Repository<Telegram>,
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>
  ) {}

  // Create a new user
  async create(dto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.telegramRepository.findOne({
        where: { telegramId: dto.telegramId },
      });
      if (existingUser) {
        throw new ConflictException(
          'User with this Telegram ID already exists'
        );
      }

      const telegram = await this.telegramRepository.save(dto);
      const meta = await this.metaRepository.save({});
      return await this.userRepository.save({ telegram, meta });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        telegram: true,
        accounts: true,
        meta: true,
      },
    });
  }

  // Find one user by ID
  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { telegram: true, accounts: true },
    });
  }

  // Update a user by ID
  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findOne(id); // Return the updated user
  }

  // Delete a user by ID
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByTelegramId(telegramId: number): Promise<User | null> {
    const telegram = await this.telegramRepository.findOne({
      where: { telegramId },
      relations: ['user'], // Assuming 'user' relation is defined in the Telegram entity
    });

    if (!telegram) {
      return null;
    }

    return await this.userRepository.findOne({
      where: { telegram: telegram },
      relations: {
        telegram: true,
        accounts: true,
        meta: true,
      },
    });
  }
}
