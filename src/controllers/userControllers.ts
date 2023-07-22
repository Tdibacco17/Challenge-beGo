import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya está registrado" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = await User.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = User.tokenSign({
      email: user.email,
      role: "usuario"
    })

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};