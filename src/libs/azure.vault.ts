import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";

export class AzureVault {
    static credential: TokenCredential = new DefaultAzureCredential();
    static url: string = process.env.AZURE_SECRETS_URL;

    constructor() { }

    public static getKeyVaultSecret = async (isStringifiedJson?: boolean) => {
        const client = new SecretClient(this.url, this.credential);
        const secret: any = await client.getSecret(process.env.AZURE_SECRETS_NAME);
        return isStringifiedJson ? JSON.parse(secret.value) : secret;
    }
}