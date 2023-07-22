import { Document, Model } from "mongoose";

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Route {
    pointA: {
        placeId: string;
        coordinates: Coordinates | null
    };
    pointB: {
        placeId: string;
        coordinates: Coordinates | null
    };
    distance: number;
}

export interface RouteDoc extends Document, Route { }

export interface RouteModel extends Model<RouteDoc> { }