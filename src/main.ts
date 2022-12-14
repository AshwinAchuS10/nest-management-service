import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './modules/user.module';
import { ConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './middlewares/rpc.exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: new ConfigService().get('host'),
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen();
}

bootstrap();
