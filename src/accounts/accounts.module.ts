import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from 'src/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
