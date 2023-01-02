import 'module-alias/register';
import 'reflect-metadata';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'configuration/config.service';
import logger from 'configuration/logger.service';
import { LoggingInterceptor } from 'middlewares/logging.interceptor';
import { ValidationPipe } from 'middlewares/validation.pipe';
import { ManagementServiceModule } from 'modules/management.service.module';
import { ExceptionsFilter } from 'middlewares/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        ManagementServiceModule,
        new FastifyAdapter()
    );

    const options = new DocumentBuilder()
        .setTitle('Management Services API docs')
        .setVersion('1.0')
        .build();

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
