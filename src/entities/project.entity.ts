import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the project' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the project' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Logotype URL of the project' })
  logotype: string;

  @Column()
  @ApiProperty({ description: 'Color associated with the project' })
  color: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Link to the project website', nullable: true })
  link: string;

  @Column()
  @ApiProperty({ description: 'Discord chat link for the project' })
  chat: string;

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
