import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { listValidPoints, loadPointsData } from "../controllers/pointController";

export const router = Router();

router.get("/points", authMiddleware, listValidPoints);

router.post("/load-points", authMiddleware, loadPointsData);