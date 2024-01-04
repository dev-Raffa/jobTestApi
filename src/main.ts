import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://job-test-app.vercel.app/',
        'https://job-test-app-rafaelconceicao.vercel.app/',
        'https://job-test-app-git-main-rafaelconceicao.vercel.app/',
      ],
      allowedHeaders: ['Content-Type', 'Accept'],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE,',
      credentials: true,
      optionsSuccessStatus: 200,
      preflightContinue: true,
    },
  });
  await app.listen(3000);
}

bootstrap();
