import { Module } from '@nestjs/common';
import { ReportsWLController } from './reports-wl.controller';
import { ReportsWLService } from './reports-wl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportWL } from 'src/entities/reportWL.entity';
import { Account } from 'src/entities/account.entity';
import { Project } from 'src/entities/project.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportWL, Account, Project, Wallet, User]),
  ],
  controllers: [ReportsWLController],
  providers: [ReportsWLService],
})
export class ReportsWlModule {}
