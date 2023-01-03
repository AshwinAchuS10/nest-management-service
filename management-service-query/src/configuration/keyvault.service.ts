import { DefaultAzureCredential } from '@azure/identity';
import { AzureKeyVault, Logger } from '@myorganisationtbc/common';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';

class KeyVaultService {
    public data: any;
    public async init() {
        let credential: any = new DefaultAzureCredential();
        const secrets: IAzureUserSecrets = await AzureKeyVault.getKeyVaultSecret(
            credential,
            `${process.env.AZURE_SECRETS_URL}`
        );
        this.data = secrets;
    }
}

const keyvault = new KeyVaultService();

export default keyvault;
