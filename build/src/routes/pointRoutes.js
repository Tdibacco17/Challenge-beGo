"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const pointController_1 = require("../controllers/pointController");
exports.router = (0, express_1.Router)();
exports.router.get("/points", authMiddleware_1.authMiddleware, pointController_1.listValidPoints);
exports.router.post("/load-points", authMiddleware_1.authMiddleware, pointController_1.loadPointsData);
//# sourceMappingURL=pointRoutes.js.map