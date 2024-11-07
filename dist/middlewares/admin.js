"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const unauthorized_exception_1 = require("../exceptions/unauthorized.exception");
const root_1 = require("../exceptions/root");
const adminMiddleware = (req, res, next) => {
    var _a;
    const role = (_a = req.admin) === null || _a === void 0 ? void 0 : _a.role;
    if (role === 'ADMIN') {
        next();
    }
    else {
        next(new unauthorized_exception_1.UnAuthorizedException(`Only ${role} has access to this`, root_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.adminMiddleware = adminMiddleware;
