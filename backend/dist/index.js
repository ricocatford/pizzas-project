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
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const config = new config_1.default();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = crypto_js_1.default.AES.encrypt(req.body.password, config.encryptionKey).toString();
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
        console.log(error);
    }
    res.send();
}));
