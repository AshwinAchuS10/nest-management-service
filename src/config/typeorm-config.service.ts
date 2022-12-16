import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IAzureUserSecrets } from 'src/interfaces/azure.secrets';
import { ConfigService } from './config.service';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    let secrets: IAzureUserSecrets = await new ConfigService().getSecrets();
    return {
      type: 'mysql',
      host: secrets?.database?.host,
      port: secrets?.database?.port,
      username: secrets?.database?.username,
      password: secrets?.database?.password,
      database: secrets?.database?.database,
      synchronize: false,
      autoLoadEntities: true,
    }
  }
}
