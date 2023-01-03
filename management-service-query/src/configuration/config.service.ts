import { DefaultAzureCredential } from '@azure/identity';
import { AzureKeyVault } from '@myorganisationtbc/common';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';
export class ConfigService {
    private readonly envConfig: { [key: string]: any } = {};

    constructor() {
        this.envConfig = {
            port: process.env.MANAGEMENT_SERVICE_QUERY_PORT,
            host: process.env.MANAGEMENT_SERVICE_QUERY_HOST
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
        console.log('secrets: ', secrets);
        this.envConfig.secrets = secrets;
        return this.envConfig.secrets;
    }
}
