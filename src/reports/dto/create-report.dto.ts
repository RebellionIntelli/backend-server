import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsUUID,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { reportStatus } from 'src/entities/enums/reportStatus.enum';

export class CreateReportDto {
  @ApiProperty({
    description: 'Title of the report',
    example: 'Monthly Financial Report',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Project ID associated with the report',
    example: '7f3e09c2-2d68-4d9e-9e8b-8e97e5f6c6b0',
  })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({
    description: 'Account ID associated with the report',
    example: '2a5b0e3f-d97f-4d46-bce5-d58b5f7997e3',
  })
  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @ApiProperty({
    description: 'User ID associated with the report',
    required: false,
    example: 'f7a8b123-3b7e-4c42-8511-91e7f4d1b7a2',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsEnum(reportStatus)
  status?: reportStatus;

  @ApiProperty({
    description: 'Files attached to the report',
    type: [String],
    example: ['https://example.com/file1.pdf', 'https://example.com/file2.pdf'],
  })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1, { message: 'At least one file must be provided' })
  files?: string[];
}
