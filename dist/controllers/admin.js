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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = void 0;
const admin_1 = require("../schema/admin");
const __1 = require("..");
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validatedData = admin_1.UpdateAdminSchema.parse(req.body);
    const updatedUser = yield __1.prismaClient.admin.update({
        where: { id: (_a = req.admin) === null || _a === void 0 ? void 0 : _a.id },
        data: validatedData,
    });
    res.json({ success: true, updatedUser });
});
exports.updateAdmin = updateAdmin;
