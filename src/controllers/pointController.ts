import { Request, Response } from "express";
import PointModel from "../models/pointModel";
import pointsData from "../../docs/points.json";

export const listValidPoints = async (req: Request, res: Response) => {
    try {
        const validPoints = await PointModel.aggregate([
            {
                $match: {
                    "location.name": "Cristo Redentor, Las Heras, Mendoza"
                }
            }
        ]).exec();

        if (validPoints.length === 0) {
            res.status(404).json({ error: "No se encontraron puntos válidos en la base de datos." });
        }

        res.json(validPoints);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los puntos válidos." });
    }
};

export const loadPointsData = async (req: Request, res: Response) => {
    try {
        if (!pointsData || pointsData.length === 0) {
            res.status(400).json({ error: "No se encontraron datos de puntos para cargar." });
        }

        const transformedPoints = pointsData.map((point) => {
            return { ...point, _id: point._id.$oid };
        });

        const createdPoints = [];
        const existingPoints = [];

        for (const point of transformedPoints) {
            const existingPoint = await PointModel.findOne({ _id: point._id });

            if (existingPoint) {
                existingPoints.push(point);
            } else {
                await PointModel.create(point);
                createdPoints.push(point);
            }
        }

        let message = "Datos de puntos cargados en la base de datos.";

        if (createdPoints.length > 0) {
            message += ` Puntos creados: ${createdPoints.map((point) => point._id).join(", ")}.`;
        }

        if (existingPoints.length > 0) {
            message += ` Puntos existentes: ${existingPoints.map((point) => point._id).join(", ")}.`;
        }

        res.status(200).json({ message });
    } catch (error) {
        console.error("Error al cargar los datos de puntos:", error);
        res.status(500).json({ Error: "Error al cargar los datos de puntos en la base de datos." });
    }
};
