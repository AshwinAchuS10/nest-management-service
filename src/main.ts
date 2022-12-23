import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from './configuration/config.service';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './middlewares/rpc.exception';
import { ManagementServiceModule } from './modules/management.service.module';

async function bootstrap() {

  let configService = new ConfigService();
  const app = await NestFactory.createMicroservice(ManagementServiceModule, {
    transport: Transport.TCP,
    options: {
      host: configService.get('host'),

      port: configService.get('port'),
    },
  } as unknown as TcpOptions);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen();
}

bootstrap();
