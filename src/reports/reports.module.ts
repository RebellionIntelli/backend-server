import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/entities/report.entity';
import { Account } from 'src/entities/account.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/User.entity';
import { ReportWL } from 'src/entities/reportWL.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, Account, Project, User, ReportWL]),
  ],

  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
