import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://job-test-inhsag2h3-rafaelconceicao.vercel.app/',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Content-Type, Accept',
      preflightContinue: false,
    },
  });
  await app.listen(3001);
}
bootstrap();
