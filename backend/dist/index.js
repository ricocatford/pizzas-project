"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const db_1 = __importDefault(require("./db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(config_1.config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config_1.config.port}`);
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailAddress, password } = req.body;
    const searchUserResult = yield (0, db_1.default) `
        select id, email_address, password from pizzas.users
        where email_address = ${emailAddress}
    `;
    const searchUser = searchUserResult[0];
    if (!searchUser) {
        res.status(401).send("Credentials are invalid.");
    }
    const passwordIsMatch = yield bcrypt.compare(password, searchUser.password);
    if (!passwordIsMatch) {
        res.status(401).send("Credentials are invalid.");
        return;
    }
    const generatedToken = jsonwebtoken_1.default.sign({
        id: searchUser.id,
        emailAddress: searchUser.emailAddress
    }, config_1.config.jwtKey, {
        expiresIn: "5min",
    });
    res.status(200).send({
        token: generatedToken,
    });
}));
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = yield bcrypt.hash(req.body.password, saltRounds);
    req.body.password = encryptedPassword;
    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: encryptedPassword,
    };
    try {
        yield (0, db_1.default) `
            insert into pizzas.users
                (id, first_name, last_name, email_address, password)
            values
                (${user.id}, ${user.firstName}, ${user.lastName}, ${user.emailAddress}, ${user.password})
        `;
    }
    catch (error) {
        res.status(409).send("This email address is already in use.");
    }
    res.send();
}));
app.get("/protected", authMiddleware_1.authMiddleware, (req, res) => {
    console.log(req.body);
    res.send("Express + TypeScript Server");
});
