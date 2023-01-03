import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';
import keyvault from './keyvault.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    async createMongooseOptions(): Promise<MongooseModuleOptions> {
        let secrets: IAzureUserSecrets = keyvault.data;
        return {
            // should be normalised connection url with creds attached
            // uri: `mongodb://${secrets.database.username}:${secrets.database.password}@${secrets.database.host}/${secrets.database.name}`
            uri: process.env.NODE_ENV == 'production' ?
                    `mongodb+srv://${secrets.database.username}:${secrets.database.password}@${secrets.database.host}/${secrets.database.name}`
                    :
                    // `mongodb://${secrets.database.host}/${secrets.database.name}`
                    `mongodb://${secrets.database.username}:${secrets.database.password}@${secrets.database.host}/${secrets.database.name}`
        };
    }
}
