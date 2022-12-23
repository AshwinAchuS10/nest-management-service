import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';
import { ConfigService } from './config.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    let secrets: IAzureUserSecrets = await new ConfigService().getSecrets();
    console.log('secrets: ', secrets);
    return {
      uri: `mongodb://${secrets.database.username}:${secrets.database.password}@${secrets.database.host}/${secrets.database.name}`,
    }
  }
}
