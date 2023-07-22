"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Token de acceso no proporcionado" });
    }
    if (!config_1.environment.JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET is missing in the environment configuration" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.environment.JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token de acceso inválido" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map