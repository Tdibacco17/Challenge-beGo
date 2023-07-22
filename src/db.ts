import mongoose from "mongoose";
import { environment } from "./utils/config";

export async function connectDB() {
    try {
        if (environment.MONGODB_URI) {
            await mongoose.connect(environment.MONGODB_URI);
            console.log('Connected!');
        } else {
            console.log('MONGODB_URI is not defined in the environment.');
        }
    } catch (e) {
        console.log(e);
    }
}