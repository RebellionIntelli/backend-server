import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { role } from './enums/role.enum';

@Entity()
export class Meta {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for Meta data' })
  id: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Team name' })
  teamName: string;

  @Column({ type: 'enum', enum: role, default: role.MEMBER })
  @ApiProperty({ description: 'Role of the user', enum: role })
  role: role;
}
