import { Request, Response } from "express";
import postgres from "postgres";
import sql from "../../db";

import { Pizza } from "./Pizza";

export default async function getPizzas(req: Request, res: Response<Pizza[], any>) {
    const searchPizzas: postgres.RowList<postgres.Row[]> = await sql`
        select id, name, recipe from pizzas.pizzas
    `

    const allPizzas: Pizza[] = searchPizzas.map((row) => (
        {
            id: row.id,
            name: row.name,
            recipe: JSON.parse(row.recipe)
        }
    ))

    res.status(200).send(allPizzas);
}