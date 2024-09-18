import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from './account.entity';
import { wallet } from './enums/wallet.enum';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the wallet' })
  id: string;

  @ManyToOne(() => Account, (account) => account.wallets)
  @ApiProperty({ description: 'Account associated with the wallet' })
  account: Account;

  @Column()
  @ApiProperty({ description: 'Wallet address' })
  address: string;

  @Column()
  @ApiProperty({ description: 'Wallet phrase' })
  phrase: string;

  @Column({ type: 'enum', enum: wallet })
  @ApiProperty({ description: 'Type of the wallet', enum: wallet })
  type: wallet;
}
