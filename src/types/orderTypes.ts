import { Document } from "mongoose";

export interface Point {
    placeId: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export enum OrderStatus {
    PENDING = "Pendiente",
    IN_PROGRESS = "En Progreso",
    COMPLETED = "Completada",
    CANCEL = "Cancelada"
}

export interface IOrder extends Document {
    type: string;
    description: string;
    route: {
        pickup: Point;
        dropoff: Point;
    };
    status: OrderStatus;
    truck: string;
}