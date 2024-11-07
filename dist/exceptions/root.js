"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, statusCode, errorCode, errors) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ADMIN_ALREADY_EXISTS"] = 1001] = "ADMIN_ALREADY_EXISTS";
    ErrorCode[ErrorCode["ADMIN_NOT_FOUND"] = 1002] = "ADMIN_NOT_FOUND";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 2001] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["INTERNAL_SERVER_ERR0R"] = 3001] = "INTERNAL_SERVER_ERR0R";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 4001] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 4002] = "UNAUTHORIZED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
