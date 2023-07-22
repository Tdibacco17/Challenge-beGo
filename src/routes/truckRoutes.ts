import { Router } from "express";
import { listValidTrucks, loadTrucksData } from "../controllers/truckController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.get("/trucks", authMiddleware, listValidTrucks);
router.post("/load-trucks", authMiddleware, loadTrucksData);