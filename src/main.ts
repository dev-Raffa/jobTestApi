import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://job-test-app.vercel.app',
        'https://job-test-app-rafaelconceicao.vercel.app',
        'https://job-test-app-git-main-rafaelconceicao.vercel.app',
        'http://localhost:5173'
      ],
      allowedHeaders: ['Content-Type', 'Accept'],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      credentials: true,
      optionsSuccessStatus: 204,
      preflightContinue: false
    }
  });
  await app.listen(3000);
}

bootstrap();
