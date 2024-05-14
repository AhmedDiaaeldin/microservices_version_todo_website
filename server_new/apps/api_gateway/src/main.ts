/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {createProxyMiddleware} from 'http-proxy-middleware';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3330;
  const USERS_SERVICE_URL = "http://localhost:3331";
  const LIST_SERVICE_URL = "http://localhost:3332";

  // Proxy endpoints
  app.use('/api/users', createProxyMiddleware({
    target: USERS_SERVICE_URL,
    changeOrigin: true,
  }));
  app.use('/api/list', createProxyMiddleware({
    target: LIST_SERVICE_URL,
    changeOrigin: true,
  }));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
