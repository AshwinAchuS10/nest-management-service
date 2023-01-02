import { Logger, Module, Provider } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'configuration/mongoose-config.service';
import { HealthController } from 'controllers/health.controller';
import { MongooseHealthIndicator } from '@nestjs/terminus';

const infrastructure: Provider[] = [];

const application: Array<any> = [];

const domain: Array<any> = [];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([]),
  ],
  controllers: [HealthController],
  providers: [MongooseHealthIndicator, Logger, ...infrastructure, ...application, ...domain],
})
export class HealthModule {}
