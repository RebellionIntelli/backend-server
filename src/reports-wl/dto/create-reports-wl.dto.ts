// src/reports/dto/create-report-wl.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { reportStatus } from 'src/entities/enums/reportStatus.enum';

export class CreateReportsWLDto {
  @ApiProperty({
    description: 'User ID associated with the report',
    required: false,
    example: 'f7a8b123-3b7e-4c42-8511-91e7f4d1b7a2',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
  @ApiProperty({
    description: 'Title of the report',
    example: 'Unauthorized Access Attempt',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(reportStatus)
  status?: reportStatus;

  @ApiProperty({
    description: 'Project ID associated with the report',
    example: 'a6e96cce-92cb-4a2b-a292-86e5d6e7e78e',
  })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({
    description: 'Account ID associated with the report',
    example: 'd2f2b5ab-6a58-4d0e-92d8-7bfb8e915e2e',
  })
  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @ApiProperty({
    description: 'Wallet ID associated with the whitelist report',
    example: 'd3c85b2f-1e05-4f0b-8d02-dae1e5e5d3e5',
  })
  @IsNotEmpty()
  @IsUUID()
  walletId: string;

  @ApiProperty({
    description: 'Files attached to the report',
    type: [String],
    example: ['report1.pdf', 'screenshot.png'],
  })
  @IsArray()
  @IsOptional()
  files?: string[];
}
