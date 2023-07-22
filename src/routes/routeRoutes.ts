import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createRoute } from "../controllers/routeController";

export const router = Router();

router.post("/routes", authMiddleware, createRoute);
