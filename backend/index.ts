import express, { Express, Request, Response } from "express";
import CryptoJS from "crypto-js";
import Config from "./config";
import sql from "./db";


const app: Express = express();

const config = new Config();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});

type NewUser = {
    id: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
}

app.post("/users", async (req: Request<any, any, NewUser>, res: Response) => {
    const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, config.encryptionKey).toString();
    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: encryptedPassword,
    }
    try {
        await sql`
            insert into pizzas.users
                (id, first_name, last_name, email_address, password)
            values
                (${user.id}, ${user.firstName}, ${user.lastName}, ${user.emailAddress}, ${user.password})
        `;
    } catch (error) {
        console.log(error);
    }

    res.send();
})
