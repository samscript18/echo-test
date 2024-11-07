"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = exports.UpdateAdminSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z
    .object({
    userName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    date_of_birth: zod_1.z.string().date().optional(),
    permanent_address: zod_1.z.string().optional(),
    present_address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
})
    .required({ userName: true, email: true, password: true });
exports.UpdateAdminSchema = zod_1.z.object({
    userName: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    date_of_birth: zod_1.z.string().date().optional(),
    permanent_address: zod_1.z.string().optional(),
    present_address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
});
exports.RoleSchema = zod_1.z.object({
    role: zod_1.z.enum(['ADMIN']),
});
