import { User } from './entities/User.entity';
import { Wallet } from './entities/wallet.entity';
import { Telegram } from './entities/telegram.entity';
import { ReportWL } from './entities/reportWL.entity';
import { Report } from './entities/report.entity';
import { Project } from './entities/project.entity';
import { Meta } from './entities/meta.entity';
import { Credentials } from './entities/credentials.entity';
import { Account } from './entities/account.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { ProjectsModule } from './projects/projects.module';
import { ReportsModule } from './reports/reports.module';
import { ReportsWlModule } from './reports-wl/reports-wl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: configService.get('DATABASE_TYPE') as 'postgres',
          host: configService.get('DATABASE_HOST') as string,
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME') as string,
          password: configService.get('DATABASE_PASSWORD') as string,
          database: configService.get('DATABASE_DATABASE') as string,
          entities: [
            User,
            Account,
            Wallet,
            Telegram,
            ReportWL,
            Report,
            Project,
            Meta,
            Credentials,
          ],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([]),
    BotModule,
    UsersModule,
    AccountsModule,
    ProjectsModule,
    ReportsModule,
    ReportsWlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
