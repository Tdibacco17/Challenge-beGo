import { Document, Model } from "mongoose";

export interface Point {
    _id: string;
    location: {
        name: string;
        placeId: string;
    };
}

export interface PointDoc extends Document {
    location: {
        name: string;
        placeId: string;
    };
}

export interface PointModel extends Model<PointDoc> { }
