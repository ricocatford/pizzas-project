"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authentication;
    if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith("Bearer")) {
        res.status(401).send("Invalid token.");
        return;
    }
    const authToken = authHeader.slice(7);
    try {
        const tokenData = jsonwebtoken_1.default.verify(authToken, config_1.config.jwtKey);
        req.body.tokenData = tokenData;
    }
    catch (error) {
        res.status(401).send("Invalid token.");
    }
    next();
    // if (auth && auth.startsWith('Bearer')) {
    //     const token = auth.slice(7);
    //     try {
    //         const tokenData = verifyToken(token);
    //         req.body.tokenData = tokenData;
    //         next();
    //     } catch (error) {
    //         throw new ErrorException(ErrorCode.Unauthenticated);
    //     }
    // } else {
    //     throw new ErrorException(ErrorCode.Unauthenticated);
    // }
};
exports.authMiddleware = authMiddleware;
