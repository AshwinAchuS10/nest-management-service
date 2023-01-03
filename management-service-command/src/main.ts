import 'module-alias/register';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'configuration/config.service';
import logger from 'configuration/logger.service';
import { ExceptionsFilter } from 'middlewares/exception.filter';
import { LoggingInterceptor } from 'middlewares/logging.interceptor';
import { ValidationPipe } from 'middlewares/validation.pipe';
import { ManagementServiceModule } from 'modules/management.service.module';
import keyvault from 'configuration/keyvault.service';
import applicationInsight from 'configuration/applicationinsight.service';

async function bootstrap() {

    await keyvault.init();

    await applicationInsight.init();

    const app = await NestFactory.create<NestFastifyApplication>(
        ManagementServiceModule,
        new FastifyAdapter()
    );

    await logger.init();

    app.useGlobalInterceptors(new LoggingInterceptor());

    const options = new DocumentBuilder()
        .setTitle('Management Services API docs')
        .setVersion('1.0')
        .build();

    app.setGlobalPrefix('v1/management-services');

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new ExceptionsFilter());

    const document = SwaggerModule.createDocument(app, options);

    const swaggerOptions: SwaggerCustomOptions = {
        customSiteTitle: 'Management Services Command API docs'
    }
    SwaggerModule.setup('api', app, document, swaggerOptions);

    await app.listen(await new ConfigService().get('port'));
}

bootstrap();
