import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBXZYW_0LhEbOL4cB5cdvLaeFdsBiA3vyk',
  authDomain: 'doccoursesapi.firebaseapp.com',
  projectId: 'doccoursesapi',
  storageBucket: 'doccoursesapi.appspot.com',
  messagingSenderId: '175503456337',
  appId: '1:175503456337:web:ed5f08f4a4dc79a9282070',
  measurementId: 'G-Y9ZFS85C2F'
};

const firebaseApp = initializeApp(firebaseConfig);
const analytcs = getAnalytics(firebaseApp);

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
