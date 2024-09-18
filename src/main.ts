import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  // const corsOptions = {
  //   origin: (origin, callback) => {
  //     const allowedOrigin = new URL(APP_URL).hostname;
  //     if (!origin || new URL(origin).hostname === allowedOrigin) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   credentials: true,
  // };
  app.enableCors();
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');
  const APP_URL = configService.getOrThrow('APP_URL');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rebellion Intelli API')
    .setDescription(
      'API documentation for Rebellion Intelli application. Provides detailed information about the available routes, request parameters, and responses.'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Rebellion Intelli Support',
      'https://rebellionintelli.com/support',
      'support@rebellionintelli.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const logger = new Logger('Bootstrap');

  await app.listen(PORT);

  logger.log(`----------------------------------------------------------`);
  logger.log(`🚀 Server started successfully on port ${PORT}`);
  logger.log(`🔗 Swagger UI is available at ${APP_URL}:${PORT}/api/docs`);
  logger.log(`🗂️ Application base URL is ${APP_URL}:${PORT}`);
  logger.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`----------------------------------------------------------`);
}

bootstrap();
