import { Transport } from '@nestjs/microservices';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';
import { AzureVault } from '../libraries/azure.vault';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = {};

  constructor() {
    this.envConfig = {
      port: process.env.MANAGEMENT_SERVICE_PORT,
      host: process.env.MANAGEMENT_SERVICE_HOST,
    };
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.mailerService = {
      options: {
        port: process.env.MAILER_SERVICE_PORT,
        host: process.env.MAILER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): Promise<any> {
    return this.envConfig[key];
  }

  async getSecrets(): Promise<any> {
    const secrets: IAzureUserSecrets = await AzureVault.getKeyVaultSecret(true);
    this.envConfig.secrets = secrets;
    return this.envConfig.secrets;
  }
}