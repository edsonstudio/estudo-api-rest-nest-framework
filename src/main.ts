import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './shared/services/custom-logger.service';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Opção para ter o log da aplicação no console e de forma customizada:
  // const app = await NestFactory.create(AppModule, {
  //   logger: new CustomLogger()
  // });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.use(compression());

  // OpenAPI - Swagger
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API desenvolvida durante o Curso Criando APIs com Nest Framework(v10)')
    .setVersion('1.0.0')
    // .addTag('petshop')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
