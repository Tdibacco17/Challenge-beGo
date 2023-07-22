"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./utils/config");
const db_1 = require("./db");
// import { router as adminDashboardRoutes } from "./src/routes/adminDashboardRoute.js"
const server = (0, express_1.default)();
//middlewares
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use((0, cors_1.default)());
//acceso a rutas
// server.use("/", userRoutes);
//conexiones
let PORT = 3000;
if (config_1.environment.PORT) {
    PORT = parseInt(config_1.environment.PORT, 10);
}
;
let HOST = "0.0.0.0";
if (config_1.environment.HOST) {
    HOST = config_1.environment.HOST;
}
;
(0, db_1.connectDB)();
server.listen(PORT, HOST, () => {
    console.log(`%s listening at ${PORT}`);
});
//# sourceMappingURL=index.js.map