export interface IAzureUserSecrets {
    database: IDatabase;
}


export interface IDatabase {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}