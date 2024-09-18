import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from './account.entity';
import { Project } from './project.entity';
import { reportStatus } from './enums/reportStatus.enum';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the report' })
  id: string;

  @Column({ type: 'enum', enum: reportStatus, default: reportStatus.WAIT })
  @ApiProperty({ description: 'Role of the user', enum: reportStatus })
  status: reportStatus;

  @Column()
  @ApiProperty({ description: 'Title of the report' })
  title: string;

  @ManyToOne(() => Project, { eager: true })
  @JoinColumn()
  @ApiProperty({ description: 'Project associated with the report' })
  project: Project;

  @ManyToOne(() => Account, { eager: true })
  @JoinColumn()
  @ApiProperty({ description: 'Account associated with the report' })
  account: Account;

  @Column('simple-array')
  @ApiProperty({ description: 'Files attached to the report', type: [String] })
  files: string[];
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
