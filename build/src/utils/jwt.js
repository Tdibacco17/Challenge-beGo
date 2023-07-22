"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.tokenSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const tokenSign = (data) => {
    if (!config_1.environment.JWT_SECRET || !config_1.environment.JWT_ALGORITHM || !config_1.environment.JWT_EXPIRE) {
        throw new Error("JWT_SECRET, JWT_ALGORITHM or JWT_EXPIRE is missing in the environment configuration");
    }
    const token = jsonwebtoken_1.default.sign(Object.assign({}, data), config_1.environment.JWT_SECRET, {
        algorithm: config_1.environment.JWT_ALGORITHM,
        expiresIn: config_1.environment.JWT_EXPIRE,
    });
    return token;
};
exports.tokenSign = tokenSign;
const verifyToken = (token) => {
    if (!config_1.environment.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in the environment configuration");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.environment.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map