import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Telegram } from './telegram.entity';
import { Meta } from './meta.entity';
import { Account } from './account.entity';
import { ReportWL } from './reportWL.entity';
import { Report } from './report.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @OneToOne(() => Telegram, { cascade: true })
  @JoinColumn()
  @ApiProperty({ description: 'Telegram data associated with the user' })
  telegram: Telegram;

  @OneToOne(() => Meta, { cascade: true })
  @JoinColumn()
  @ApiProperty({ description: 'Metadata for the user' })
  meta: Meta;

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  @ApiProperty({
    type: () => [Account],
    description: 'Accounts associated with the user',
  })
  accounts: Account[];

  @ApiProperty({
    description: 'Reports of the user',
    type: () => Report,
    isArray: true,
  })
  reports: {
    common: Report[];
    wl: ReportWL[];
  };

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
