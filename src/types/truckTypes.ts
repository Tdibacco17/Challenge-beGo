import { Document, Model } from "mongoose";

export interface TruckDoc extends Document {
    model: string;
    make: string;
    year: number;
    color: string;
    transportWeight: number;
    created_at: number;
}

export interface TruckModel extends Model<TruckDoc> { }