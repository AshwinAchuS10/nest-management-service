export interface IAzureUserSecrets {
    database: IDatabase;
    applicationInsight: IApplicationInsight;
}

export interface IDatabase {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
}

export interface IApplicationInsight {
    key: string;
}
