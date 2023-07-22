import { Schema, model } from "mongoose";
import { RouteDoc, RouteModel } from "../types/routeTypes";

const routeSchema = new Schema<RouteDoc>(
    {
        pointA: {
            placeId: {
                type: String,
                required: true,
            },
            coordinates: {
                lat: {
                    type: Number,
                    required: true,
                },
                lng: {
                    type: Number,
                    required: true,
                },
            },
        },
        pointB: {
            placeId: {
                type: String,
                required: true,
            },
            coordinates: {
                lat: {
                    type: Number,
                    required: true,
                },
                lng: {
                    type: Number,
                    required: true,
                },
            },
        },
        distance: {
            type: Number,
            required: true,
        },
    }, {
    timestamps: true,
});

const RouteModel = model<RouteDoc, RouteModel>("Route", routeSchema);

export default RouteModel;