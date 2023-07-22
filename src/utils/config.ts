import dotenv from "dotenv";
import { EnviromentInterface } from "../types/config";
dotenv.config();

export const environment: EnviromentInterface = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_PASS_AUTH: process.env.MONGODB_PASS_AUTH,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_EXPIRE: process.env.JWT_EXPIRE
}