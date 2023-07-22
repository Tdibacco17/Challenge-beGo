import { JwtPayload } from "jsonwebtoken";
import { Document, Model } from "mongoose";

export interface UserDoc extends Document {
    email: string;
    password: string;
}

export interface UserModel extends Model<UserDoc> {
    comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean>;
    tokenSign(data: any): string;
    verifyToken(token: string): JwtPayload | null;
}