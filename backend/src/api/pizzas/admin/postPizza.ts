import { Request, Response } from "express";
import { Pizza } from "../Pizza";
import sql from "../../../db";

export default async function postPizza(req: Request<any, any, Pizza>, res: Response) {
    try {
        await sql`
            insert into pizzas.pizzas
                (id, name, recipe)
            values
                (${req.body.id}, ${req.body.name}, ${JSON.stringify(req.body.recipe)})
        `
    } catch (error) {
        res.status(422).send("Incorrect data type, please try again.");
        return;
    }

    res.sendStatus(201);
}