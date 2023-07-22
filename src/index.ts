import express from 'express';
import cors from "cors";
import { environment } from './utils/config';
import { connectDB } from './db';

import { router as userRoutes } from "./routes/userRoutes";
import { router as trackRoutes} from "./routes/truckRoutes";
import { router as pointRoutes} from "./routes/pointRoutes";
import { router as routeRoutes} from "./routes/routeRoutes";

const server = express();

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

//acceso a rutas
server.use("/", userRoutes);
server.use("/", trackRoutes);
server.use("/", pointRoutes);
server.use("/", routeRoutes);

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