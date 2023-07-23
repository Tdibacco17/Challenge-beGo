import { Request, Response } from "express";
import OrderModel from "../models/orderModel";
import TruckModel from "../models/truckModel";
import { IOrder, OrderStatus } from "../types/orderTypes";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { type, description, route } = req.body;

        const newOrder: IOrder = new OrderModel({
            type,
            description,
            route,
            status: OrderStatus.PENDING,
            truck: "Sin asignación",
        });

        const savedOrder = await newOrder.save();

        if (!savedOrder) {
            return res.status(500).json({ error: "Error al crear la orden" });
        }

        return res.status(201).json({ order: savedOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al crear la orden" });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find();

        if (orders.length === 0) {
            return res.status(200).json({ message: "No hay órdenes disponibles." });
        }

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener las órdenes" });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener la orden" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        if (!Object.values(OrderStatus).includes(status)) {
            return res.status(400).json({ error: "El estado proporcionado no es válido" });
        }

        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        if (order.status === OrderStatus.IN_PROGRESS) {
            return res.status(403).json({ error: "No se puede modificar una orden en progreso" });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar la orden" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        if (order.status === OrderStatus.IN_PROGRESS) {
            return res.status(403).json({ error: "No se puede eliminar una orden en progreso" });
        }

        await OrderModel.findByIdAndDelete(orderId);

        return res.status(200).json({ message: "Orden eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar la orden" });
    }
};

export const assignTruckToOrder = async (req: Request, res: Response) => {
    try {
        const { orderId, truckId } = req.params;

        const order = await OrderModel.findById({ _id: orderId });
        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        if (order.status === OrderStatus.IN_PROGRESS) {
            return res.status(400).json({ error: "La orden ya está en progreso y no se puede modificar" });
        }

        if (order.truck !== "Pendiente" && order.truck !== "Completada" && order.truck !== "Cancelada") {
            return res.status(400).json({ error: "El camión ya está asignado a esta orden" });
        }

        const selectedTruck = await TruckModel.findById({ _id: truckId });
        if (!selectedTruck) {
            return res.status(404).json({ error: "Camión no encontrado" });
        }

        await OrderModel.updateOne({ _id: orderId }, { $set: { truck: truckId } });

        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ error: "Error al asignar el camión a la orden" });
    }
};