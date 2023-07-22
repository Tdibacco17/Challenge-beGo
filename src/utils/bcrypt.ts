import bcrypt from "bcrypt";

export const encrypt = async (textPlain: string) => {
    return await bcrypt.hash(textPlain, 10)
}

export const compare = async (passwordPlain: string, hashPassword: string) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}