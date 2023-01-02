import { Transport } from '@nestjs/microservices';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';
import { AzureKeyVault } from '@myorganisationtbc/common';
import { DefaultAzureCredential } from '@azure/identity';
export class ConfigService {
    private readonly envConfig: { [key: string]: any } = {};

    constructor() {
        this.envConfig = {
            port: process.env.MANAGEMENT_SERVICE_PORT,
            host: process.env.MANAGEMENT_SERVICE_HOST
        };
        this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
        this.envConfig.mailerService = {
            options: {
                port: process.env.MAILER_SERVICE_PORT,
                host: process.env.MAILER_SERVICE_HOST
            },
            transport: Transport.TCP
        };
    }

    get(key: string): Promise<any> {
        return this.envConfig[key];
    }

    async getSecrets(): Promise<any> {
        let credential: any = new DefaultAzureCredential();
        const secrets: IAzureUserSecrets = await AzureKeyVault.getKeyVaultSecret(
            credential,
            `${process.env.AZURE_SECRETS_URL}`
        );
        this.envConfig.secrets = secrets;
        return this.envConfig.secrets;
    }
}
