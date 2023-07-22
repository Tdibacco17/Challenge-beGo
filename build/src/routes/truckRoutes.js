"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const truckController_1 = require("../controllers/truckController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.router = (0, express_1.Router)();
exports.router.get("/trucks", authMiddleware_1.authMiddleware, truckController_1.listValidTrucks);
exports.router.post("/load-trucks", authMiddleware_1.authMiddleware, truckController_1.loadTrucksData);
//# sourceMappingURL=truckRoutes.js.map