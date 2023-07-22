"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.router = (0, express_1.Router)();
exports.router.post("/register", userControllers_1.createUser);
exports.router.post("/login", userControllers_1.loginUser);
//Auth
exports.router.get("/profile", authMiddleware_1.authMiddleware, (req, res) => {
    const user = req.user;
    return res.status(200).json({ user });
});
//# sourceMappingURL=userRoutes.js.map