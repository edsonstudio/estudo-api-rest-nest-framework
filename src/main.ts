import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './shared/services/custom-logger.service';
import * as compression from 'compression';

async function bootstrap() {
  // Opção para ter o log da aplicação no console e de forma customizada:
  // const app = await NestFactory.create(AppModule, {
  //   logger: new CustomLogger()
  // });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.use(compression());
  await app.listen(port);
}
bootstrap();
