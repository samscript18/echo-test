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
exports.me = exports.login = exports.signup = void 0;
const index_1 = require("../index");
const auth_helper_1 = require("../helpers/auth.helper");
const jwt_helper_1 = __importDefault(require("../helpers/jwt.helper"));
const admin_1 = require("../schema/admin");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    admin_1.SignUpSchema.parse(req.body);
    const adminExists = yield index_1.prismaClient.admin.findFirst({
        where: { email: req.body.email },
    });
    if (adminExists) {
        throw new bad_request_1.BadRequestsException('admin with this email already exists', root_1.ErrorCode.ADMIN_ALREADY_EXISTS);
    }
    const hashedPassword = yield (0, auth_helper_1.hashPassword)(req.body.password);
    const admin = yield index_1.prismaClient.admin.create({
        data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
    });
    res.json(admin);
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let admin = yield index_1.prismaClient.admin.findFirst({ where: { email } });
    if (!admin) {
        throw new not_found_1.NotFoundException('Admin does not exist', root_1.ErrorCode.ADMIN_NOT_FOUND);
    }
    const isMatch = yield (0, auth_helper_1.comparePassword)(password, admin.password);
    if (!isMatch) {
        throw new bad_request_1.BadRequestsException('Incorrect password', root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const accessToken = yield jwt_helper_1.default.generateToken(admin === null || admin === void 0 ? void 0 : admin.id.toString());
    res.json({ accessToken });
});
exports.login = login;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const admin = yield index_1.prismaClient.admin.findFirst({
        where: { id: (_a = req.admin) === null || _a === void 0 ? void 0 : _a.id },
    });
    res.json(admin);
});
exports.me = me;
