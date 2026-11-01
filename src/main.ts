import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express, Request, Response } from 'express';
import { AppModule } from './app.module';

const server: Express = express();
let isAppInitialized = false;

async function createNestServer(expressInstance: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
  return app;
}

// Standalone execution (Docker / Local Development)
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await createNestServer(server);
  const port = Number(process.env.PORT) || 3000;
  const host = '0.0.0.0';

  await app.listen(port, host);

  logger.log(`Application is running on: http://localhost:${port}/graphql`);
  logger.log(`Health check is available at: http://localhost:${port}/health`);
}

if (!process.env.VERCEL) {
  void bootstrap();
}

// Vercel Serverless Handler
export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  if (!isAppInitialized) {
    await createNestServer(server);
    isAppInitialized = true;
  }
  server(req, res);
}
