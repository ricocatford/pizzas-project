import bcrypt from "bcrypt";
import { Request, Response } from "express";
import sql from "../../db";

import { NewUser } from "./NewUser";


export default async function postRegister(req: Request<any, any, NewUser>, res: Response) {
    const encryptedPassword: string = await bcrypt.hash(req.body.password, 10);

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
}

