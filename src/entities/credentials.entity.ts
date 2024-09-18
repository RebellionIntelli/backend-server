import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from './account.entity';
import { social } from './enums/social.enum';

@Entity()
export class Credentials {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the credentials' })
  id: string;

  @Column({ type: 'enum', enum: social, nullable: false })
  @ApiProperty({ description: 'Type of the social network', enum: social })
  social: social;

  @Column()
  @ApiProperty({ description: 'Login for the platform' })
  login: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Password for the platform', nullable: true })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Subscriber count (for social platforms)',
    nullable: true,
  })
  subscribers: number;

  @ManyToOne(() => Account, (account) => account.credentials, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @ApiProperty({ description: 'Account associated with the credentials' })
  account: Account;
}
