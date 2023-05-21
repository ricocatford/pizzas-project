import postgres from "postgres";
import Config from "./config";

const config = new Config();

const sql = postgres({
    host: config.postgresHost,
    port: config.postgresPort,
    database: config.postgresDatabase,
    user: config.postgresUser,
    password: config.postgresPassword
});

export default sql;