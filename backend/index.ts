import express, { Express, Request, Response } from "express";
import { config } from "./config";
import sql from "./db";
import jwt from "jsonwebtoken";

import { NewUser } from "./types/NewUser";
import { Login } from "./types/Login";
import { authMiddleware } from "./middleware/authMiddleware";

const app: Express = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});

app.post("/login", async (req: Request<any, any, Login>, res: Response) => {
    const { emailAddress, password }: Login = req.body;

    const searchUserResult = await sql`
        select id, email_address, password from pizzas.users
        where email_address = ${emailAddress}
    `

    const searchUser = searchUserResult[0];
    if (!searchUser) {
        res.status(401).send("Credentials are invalid.")
    }

    const passwordIsMatch = await bcrypt.compare(password, searchUser.password);

    if (!passwordIsMatch) {
        res.status(401).send("Credentials are invalid.");
        return;
    }

    const generatedToken = jwt.sign(
        {
            id: searchUser.id,
            emailAddress: searchUser.emailAddress
        },
        config.jwtKey,
        {
            expiresIn: "5min",
        }
    )

    res.status(200).send({
        token: generatedToken,
    });
})

app.post("/register", async (req: Request<any, any, NewUser>, res: Response) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = encryptedPassword;

    const user: NewUser = {
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
        res.status(409).send("This email address is already in use.");
    }

    res.send();
})

app.get("/protected", authMiddleware, (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Express + TypeScript Server");
});