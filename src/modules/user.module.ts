import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConfigService } from '../config/config.service';
import { TypeormConfigService } from '../config/typeorm-config.service';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    TypeOrmHealthIndicator,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mailerServiceOptions = configService.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule { }
