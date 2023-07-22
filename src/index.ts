import express from 'express';
import cors from "cors";
import { environment } from './utils/config';
import { connectDB } from './db';
// import { router as adminDashboardRoutes } from "./src/routes/adminDashboardRoute.js"

const server = express();

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

//acceso a rutas
// server.use("/", userRoutes);

//conexiones
let PORT = 3000;
if (environment.PORT) {
    PORT = parseInt(environment.PORT, 10);
};

let HOST = "0.0.0.0";
if (environment.HOST) {
    HOST = environment.HOST;
};

connectDB();
server.listen(PORT, HOST, () => {
    console.log(`%s listening at ${PORT}`);
});