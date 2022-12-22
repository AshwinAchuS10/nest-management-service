import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './modules/user.module';
import { ConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './middlewares/rpc.exception';
import * as appInsights from "applicationinsights";
import callLogsSample from './libs/call-logs-sample';
import  sendEvent  from './libs/azure.eventhub.send';
// import receiveEvent from './libs/azure.eventhub.receive';

async function bootstrap() {
  appInsights.setup('InstrumentationKey=811561fb-a13a-489c-9172-93a1f8ea9a2b;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/')
  .setAutoCollectConsole(true, true)
  .start();
  callLogsSample('info', null, null, null, null, "application listening");
  let configService = new ConfigService();
  const app = await NestFactory.createMicroservice(UserModule, {
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
  
  await sendEvent();
  // await receiveEvent();
  await app.listen();
}

bootstrap();
