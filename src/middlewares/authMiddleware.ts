import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { environment } from "../utils/config";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Token de acceso no proporcionado" });
    }

    if (!environment.JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET is missing in the environment configuration" });
    }

    try {
        const decoded = jwt.verify(token, environment.JWT_SECRET) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) {
            return res.status(401).json({ error: "Token de acceso inválido" });
        }

        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token de acceso inválido" });
    }
};