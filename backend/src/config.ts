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
    postgresHost: string
    postgresUser: string
    postgresPassword: string
    postgresDatabase: string
    postgresPort: number
    jwtKey: string

    constructor() {
        dotenv.config();
        this.port = Number(loadEnvironmentVariable("PORT"));
        this.postgresHost = loadEnvironmentVariable("POSTGRES_HOST");
        this.postgresUser = loadEnvironmentVariable("POSTGRES_USER");
        this.postgresPassword = loadEnvironmentVariable("POSTGRES_PASSWORD");
        this.postgresDatabase = loadEnvironmentVariable("POSTGRES_DATABASE");
        this.postgresPort = Number(loadEnvironmentVariable("POSTGRES_PORT"));
        this.jwtKey = loadEnvironmentVariable("JWT_KEY");
    }
}

export const config = new Config();