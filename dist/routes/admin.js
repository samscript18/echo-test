"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const errorHandler_1 = require("../handlers/errorHandler");
const admin_1 = require("../controllers/admin");
const admin_2 = require("../middlewares/admin");
exports.adminRoutes = (0, express_1.Router)();
exports.adminRoutes.put('/profile', [auth_1.default, admin_2.adminMiddleware], (0, errorHandler_1.errorHandler)(admin_1.updateAdmin));
