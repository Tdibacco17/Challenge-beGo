import mongoose, { Schema } from "mongoose";
import { IOrder, OrderStatus } from "../types/orderTypes";

const orderSchema = new Schema<IOrder>({
  type: String,
  description: String,
  route: {
    pickup: {
      placeId: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    dropoff: {
      placeId: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  truck: {
    type: Schema.Types.Mixed,
    ref: "Truck",
    default: undefined,
  },
});

const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;