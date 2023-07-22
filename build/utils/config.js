"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_PASS_AUTH: process.env.MONGODB_PASS_AUTH,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_EXPIRE: process.env.JWT_EXPIRE
};
//# sourceMappingURL=config.js.map