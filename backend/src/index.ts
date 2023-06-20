import express, { Express, Request, Response } from "express";
import { config } from "./config";

import getServerRoot from "./api/getServerRoot";
import { authMiddleware } from "./middleware/authMiddleware";
import postRegister from "./api/register/postRegister";
import postLogin from "./api/login/postLogin";
import postPizza from "./api/pizzas/admin/postPizza";
import getPizzas from "./api/pizzas/getPizzas";

const app: Express = express();

app.use(express.json());

app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});

app.get("/", getServerRoot);

// Register and Login API

app.post("/register", postRegister);

app.post("/login", postLogin);

// Pizzas API

app.post("/pizzas/admin", postPizza);

app.get("/pizzas", getPizzas);

// Protected API

app.get("/protected", authMiddleware, (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Express + TypeScript Server");
});