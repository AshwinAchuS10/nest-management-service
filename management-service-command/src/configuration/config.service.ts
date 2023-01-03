export class ConfigService {
    private readonly envConfig: { [key: string]: any } = {};

    constructor() {
        this.envConfig = {
            port: process.env.MANAGEMENT_SERVICE_COMMAND_PORT,
            host: process.env.MANAGEMENT_SERVICE_COMMAND_HOST
        };
    }

    get(key: string): Promise<any> {
        return this.envConfig[key];
    }
}
