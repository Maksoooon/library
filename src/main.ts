import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'books'), {
    prefix: '/books/',
    });
  app.enableCors();
  await app.listen(port);
  console.log(`server started at ${port} port!`)
}
bootstrap();
