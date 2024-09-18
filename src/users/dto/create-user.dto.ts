import { ApiProperty } from '@nestjs/swagger';
import { User } from 'telegraf/typings/core/types/typegram';

export class CreateUserDto {
  constructor(user: User) {
    this.username = user.username;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.telegramId = user.id;
  }

  @ApiProperty({ description: 'Telegram user ID' })
  telegramId: number;

  @ApiProperty({ description: 'First name of the Telegram user' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the Telegram user' })
  lastName: string;

  @ApiProperty({ description: 'Username of the Telegram user' })
  username: string;
}
