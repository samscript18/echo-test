"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const errorHandler_1 = require("../handlers/errorHandler");
const auth_2 = __importDefault(require("../middlewares/auth"));
const admin_1 = require("../middlewares/admin");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post('/signup', (0, errorHandler_1.errorHandler)(auth_1.signup));
exports.authRoutes.post('/login', (0, errorHandler_1.errorHandler)(auth_1.login));
exports.authRoutes.get('/me', [auth_2.default, admin_1.adminMiddleware], (0, errorHandler_1.errorHandler)(auth_1.me));
