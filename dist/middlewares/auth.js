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
const unauthorized_exception_1 = require("../exceptions/unauthorized.exception");
const root_1 = require("../exceptions/root");
const __1 = require("..");
const jwt_helper_1 = __importDefault(require("../helpers/jwt.helper"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new unauthorized_exception_1.UnAuthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        next(new unauthorized_exception_1.UnAuthorizedException('No token provided', root_1.ErrorCode.UNAUTHORIZED));
    }
    try {
        const payload = yield jwt_helper_1.default.verifyToken(token);
        if (!payload.adminId) {
            next(new unauthorized_exception_1.UnAuthorizedException('Invalid token', root_1.ErrorCode.UNAUTHORIZED));
        }
        const admin = yield __1.prismaClient.admin.findFirst({
            where: { id: +payload.adminId },
        });
        if (!admin) {
            next(new unauthorized_exception_1.UnAuthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        next(new unauthorized_exception_1.UnAuthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED, error));
    }
});
exports.default = authMiddleware;
