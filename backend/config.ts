import dotenv from "dotenv";

function loadEnvironmentVariable(environmentVariableName: string): string {
    const environmentVariable = process.env[environmentVariableName];
    if (environmentVariable === undefined) {
        throw new Error(`Environment variable ${environmentVariableName} is not defined.`);
    }
    return environmentVariable;
}

export default class Config {
    port: number
    encryptionKey: string
    postgresHost: string
    postgresUser: string
    postgresPassword: string
    postgresDatabase: string
    postgresPort: number

    constructor() {
        dotenv.config();
        this.port = Number(loadEnvironmentVariable("PORT"));
        this.encryptionKey = loadEnvironmentVariable("ENCRYPTION_KEY");
        this.postgresHost = loadEnvironmentVariable("POSTGRES_HOST");
        this.postgresUser = loadEnvironmentVariable("POSTGRES_USER");
        this.postgresPassword = loadEnvironmentVariable("POSTGRES_PASSWORD");
        this.postgresDatabase = loadEnvironmentVariable("POSTGRES_DATABASE");
        this.postgresPort = Number(loadEnvironmentVariable("POSTGRES_PORT"));
    }
}