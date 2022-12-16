import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '../config/config.service';
import { MongooseConfigService } from '../config/mongoose-config.service';
import { UserController } from '../controllers/user.controller';
import { UserSchema } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    MongooseHealthIndicator,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: async (configService: ConfigService) => {
        const mailerServiceOptions = await configService.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule { }
