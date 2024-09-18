import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Telegram {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for Telegram data' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Telegram user ID' })
  telegramId: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'First name of the Telegram user' })
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Last name of the Telegram user' })
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Username of the Telegram user' })
  username: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Profile picture of the Telegram user',
    nullable: true,
  })
  profilePicture: string;
}
