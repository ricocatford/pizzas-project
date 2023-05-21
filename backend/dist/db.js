"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
const config_1 = __importDefault(require("./config"));
const config = new config_1.default();
const sql = (0, postgres_1.default)({
    host: config.postgresHost,
    port: config.postgresPort,
    database: config.postgresDatabase,
    user: config.postgresUser,
    password: config.postgresPassword
});
exports.default = sql;
