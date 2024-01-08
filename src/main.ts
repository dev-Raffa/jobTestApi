import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://job-test-app.vercel.app',
        'https://job-test-app-rafaelconceicao.vercel.app',
        'https://job-test-app-git-main-rafaelconceicao.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000/'
      ],
      allowedHeaders: ['Content-Type', 'Accept'],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      credentials: true,
      optionsSuccessStatus: 204,
      preflightContinue: false
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Api Doc courses')
    .setDescription('This is a Api develloper with nextjs')
    .setVersion('1.0')
    .addTag('Doc course')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
