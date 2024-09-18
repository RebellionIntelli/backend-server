// src/reports/dto/update-report-wl.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateReportsWLDto } from './create-reports-wl.dto';

export class UpdateReportWLDto extends PartialType(CreateReportsWLDto) {}
