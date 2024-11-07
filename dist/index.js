"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const secrets_const_1 = __importDefault(require("./constants/secrets.const"));
const routes_1 = require("./routes");
const client_1 = require("@prisma/client");
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.rootRouter);
exports.prismaClient = new client_1.PrismaClient({});
app.use(error_1.errorMiddleware);
const port = secrets_const_1.default.port;
app.listen(port, () => {
    console.log(`⚡[server]: connected successfully on http://localhost:${port}`);
});
