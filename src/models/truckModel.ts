
import mongoose, { Schema } from "mongoose";
import { TruckDoc, TruckModel } from "../types/truckTypes";

const truckSchema = new Schema<TruckDoc, TruckModel>({
    model: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    transportWeight: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Number,
        required: true,
    },
});

const Truck = mongoose.model<TruckDoc, TruckModel>("Truck", truckSchema);

export default Truck;