import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class BotService {
  constructor(private readonly usersService: UsersService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const user = new CreateUserDto(ctx.from);
    const created = await this.usersService.create(user);
    const logger = new Logger('Bot');
    logger.log('Пользователь стартанул бота', { user });
    logger.log('Новый пользователь создан', created);
    const photo_url = 'https://ui.shadcn.com/avatars/01.png';
    const web_app_url = `https://telegram-app-murex.vercel.app/telegram-auth?id=${created.id}`;
    console.log(web_app_url);
    const caption =
      'Добро пожаловать! Нажмите кнопку ниже, чтобы запустить веб-приложение.';
    ctx.replyWithPhoto(
      { url: photo_url },
      {
        caption: caption,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Запустить веб-приложение',
                web_app: { url: web_app_url },
              },
            ],
          ],
        },
      }
    );
  }
}

{
  /* d3037317-45d4-47d6-bb7a-ab2a4934f699 */
}
// /telegram-auth?id=d3037317-45d4-47d6-bb7-ab2a4934f699
