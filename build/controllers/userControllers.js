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
exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "El usuario ya está registrado" });
        }
        const newUser = new userModel_1.default({ email, password });
        yield newUser.save();
        return res.status(201).json({ message: "Usuario registrado exitosamente" });
    }
    catch (error) {
        return res.status(500).json({ error: "Error al registrar el usuario" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const isPasswordValid = yield userModel_1.default.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        const token = userModel_1.default.tokenSign({
            email: user.email,
            role: "usuario"
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: "Error al iniciar sesión" });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=userControllers.js.map