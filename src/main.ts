import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = Number(process.env.PORT) || 3000;
  const host = '0.0.0.0';

  await app.listen(port, host);

  logger.log(`Application is running on: http://localhost:${port}/graphql`);
  logger.log(`Health check is available at: http://localhost:${port}/health`);
}

void bootstrap();
