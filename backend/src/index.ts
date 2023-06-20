import express, { Express, Request, Response } from "express";
import { config } from "./config";

import getServerRoot from "./api/getServerRoot";
import { authMiddleware } from "./middleware/authMiddleware";
import postLogin from "./api/login/postLogin";
import postRegister from "./api/register/postRegister";

const app: Express = express();

app.use(express.json());

app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});

app.get("/", getServerRoot);

app.post("/login", postLogin);

app.post("/register", postRegister);

app.get("/protected", authMiddleware, (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Express + TypeScript Server");
});