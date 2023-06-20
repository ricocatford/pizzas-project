import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import postgres from "postgres";
import sql from "../../db";

import { config } from "../../config";
import { Login } from "./Login";

export default async function postLogin(req: Request<any, any, Login>, res: Response) {
    const { emailAddress, password }: Login = req.body;

    const searchUserResult: postgres.RowList<postgres.Row[]> = await sql`
        select id, email_address, password from pizzas.users
        where email_address = ${emailAddress}
    `

    const searchUser: postgres.Row = searchUserResult[0];

    if (!searchUser) {
        res.status(401).send("Credentials are invalid.");
        return;
    }

    const passwordIsMatch: boolean = await bcrypt.compare(password, searchUser.password);

    if (!passwordIsMatch) {
        res.status(401).send("Credentials are invalid.");
        return;
    }

    const generatedToken: string = jwt.sign(
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
}