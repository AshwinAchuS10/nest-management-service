import * as appInsights from 'applicationinsights';
import 'module-alias/register';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'configuration/config.service';
import logger from 'configuration/logger.service';
import { ExceptionsFilter } from 'middlewares/exception.filter';
import { LoggingInterceptor } from 'middlewares/logging.interceptor';
import { ValidationPipe } from 'middlewares/validation.pipe';
import { ManagementServiceModule } from 'modules/management.service.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        ManagementServiceModule,
        new FastifyAdapter()
    );

    const options = new DocumentBuilder()
        .setTitle('Management Services API docs')
        .setVersion('1.0')
        .build();

    appInsights
        .setup('5786b830-ca6f-4e9b-b2c5-dd4fbbf9aa96')
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true, true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true, true)
        .setSendLiveMetrics(false)
        .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
        .start();

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.setGlobalPrefix('v1/management-services');

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new ExceptionsFilter());

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await logger.init();

    await app.listen(await new ConfigService().get('port'));
}

bootstrap();
