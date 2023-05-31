"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
function loadEnvironmentVariable(environmentVariableName) {
    const environmentVariable = process.env[environmentVariableName];
    if (environmentVariable === undefined) {
        throw new Error(`Environment variable ${environmentVariableName} is not defined.`);
    }
    return environmentVariable;
}
class Config {
    constructor() {
        dotenv_1.default.config();
        this.port = Number(loadEnvironmentVariable("PORT"));
        this.encryptionKey = loadEnvironmentVariable("ENCRYPTION_KEY");
        this.postgresHost = loadEnvironmentVariable("POSTGRES_HOST");
        this.postgresUser = loadEnvironmentVariable("POSTGRES_USER");
        this.postgresPassword = loadEnvironmentVariable("POSTGRES_PASSWORD");
        this.postgresDatabase = loadEnvironmentVariable("POSTGRES_DATABASE");
        this.postgresPort = Number(loadEnvironmentVariable("POSTGRES_PORT"));
        this.jwtKey = loadEnvironmentVariable("JWT_KEY");
    }
}
exports.default = Config;
exports.config = new Config();
