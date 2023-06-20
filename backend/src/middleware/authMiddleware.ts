import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith("Bearer")) {
        res.status(401).send("Invalid token.");
        return;
    }

    const authToken = authHeader.slice(7)

    try {
        const tokenData = jwt.verify(authToken, config.jwtKey);
        req.body.tokenData = tokenData;
    } catch (error) {
        res.status(401).send("Invalid token.");
    }

    next();
};