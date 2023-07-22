import { Schema, model } from "mongoose";
import { Point } from "../types/pointTypes";

const pointSchema = new Schema<Point>({
    location: {
        name: {
            type: String,
            required: true,
        },
        placeId: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
});

const PointModel = model<Point>("Point", pointSchema);

export default PointModel;