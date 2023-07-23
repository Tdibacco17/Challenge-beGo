import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
    createOrder, deleteOrder, getAllOrders,
    getOrderById, updateOrder, assignTruckToOrder
} from "../controllers/orderController";

export const router = Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getAllOrders);
router.get("/orders/:id", authMiddleware, getOrderById);
router.put("/orders/:id", authMiddleware, updateOrder);
router.delete("/orders/:id", authMiddleware, deleteOrder);

router.put("/orders/:orderId/assign-truck/:truckId", authMiddleware, assignTruckToOrder);