import { Request, Response } from "express";

export default function getServerRoot(req: Request, res: Response) {
    res.send("Express + TypeScript Server");
}