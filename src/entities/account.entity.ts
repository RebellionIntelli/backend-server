import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Credentials } from './credentials.entity';
import { Wallet } from './wallet.entity';
import { status } from './enums/status.enum';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the account' })
  id: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @ApiProperty({
    type: () => User,
    description: 'User associated with the account',
  })
  user: User;

  @OneToMany(() => Credentials, (credentials) => credentials.account, {
    cascade: true,
  })
  @ApiProperty({ description: 'Credentials associated with the account' })
  credentials: Credentials[];

  @OneToMany(() => Wallet, (wallet) => wallet.account, { cascade: true })
  @ApiProperty({ description: 'Wallets associated with the account' })
  wallets: Wallet[];

  @Column({ type: 'enum', enum: status, nullable: true })
  @ApiProperty({ description: 'Status of the account', enum: status })
  status: status;

  @ApiProperty({ description: 'Created at timestamp.' })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public readonly created_at: string;

  @ApiProperty({ description: 'Updated at timestamp.' })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public readonly updated_at: string;
}
