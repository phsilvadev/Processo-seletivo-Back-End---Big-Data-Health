import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('API de Upload de Imagens')
    .setDescription(
      'Esta API permite o upload de imagens para um serviço de armazenamento em nuvem, facilitando o gerenciamento e a manipulação das imagens.',
    )
    .addBearerAuth({
      description: 'Bearer token para autenticação',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
