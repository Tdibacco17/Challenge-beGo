import mongoose, { Schema } from "mongoose";
import { compare, encrypt } from "../utils/bcrypt";
import { UserDoc, UserModel } from "../types/userTypes";
import { tokenSign, verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const userSchema = new Schema<UserDoc, UserModel>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
});

userSchema.statics.comparePasswords = async function (
    candidatePassword: string,
    hashedPassword: string
): Promise<boolean> {
    return compare(candidatePassword, hashedPassword);
};

userSchema.statics.tokenSign = function (data: any): string {
    return tokenSign(data); 
};

userSchema.statics.verifyToken = function (token: string): JwtPayload | null {
    return verifyToken(token); 
};

userSchema.pre<UserDoc>("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const hashedPassword = await encrypt(this.password);
        this.password = hashedPassword;
        next();
    } catch (err: any) {
        return next(err);
    }
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export default User;