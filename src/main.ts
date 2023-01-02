import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'module-alias/register';
import 'reflect-metadata';
import { LoggingInterceptor } from './middlewares/logging.interceptor';
import { ConfigService } from 'configuration/config.service';
import { ManagementServiceModule } from './modules/management.service.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ManagementServiceModule,
    new FastifyAdapter()
  );

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('categories')
    .setVersion('1.0')
    .build();

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.setGlobalPrefix('v1/management-services');

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(await new ConfigService().get('port'));
}

bootstrap();
