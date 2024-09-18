import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Report } from './report.entity';
import { Wallet } from './wallet.entity';

@Entity()
export class ReportWL extends Report {
  @ManyToOne(() => Wallet, { eager: true })
  @JoinColumn()
  @ApiProperty({ description: 'Wallet associated with the whitelist report' })
  wallet: Wallet;
}
