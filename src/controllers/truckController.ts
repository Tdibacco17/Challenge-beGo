
import { Request, Response } from "express";
import Truck from "../models/truckModel";
import trucksData from "../../docs/trucks.json"

export const listValidTrucks = async (req: Request, res: Response) => {
    try {
        const validTrucks = await Truck.aggregate([
            {
                $match: { year: { $gt: 2020 } }
            }
        ]).exec();

        if (validTrucks.length === 0) {
            res.status(404).json({ error: "No se encontraron camiones válidos en la base de datos." });
        }

        res.json(validTrucks);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los camiones válidos" });
    }
};

export const loadTrucksData = async (req: Request, res: Response) => {
    try {
        if (!trucksData || trucksData.length === 0) {
            res.status(400).json({ error: "No se encontraron datos de camiones para cargar." });
        }

        const transformedTrucks = trucksData.map((truck) => {
            return { ...truck, _id: truck._id.$oid };
        });

        const createdTrucks = [];
        const existingTrucks = [];

        for (const truck of transformedTrucks) {
            const existingTruck = await Truck.findOne({ _id: truck._id });

            if (existingTruck) {
                existingTrucks.push(truck);
            } else {
                await Truck.create(truck);
                createdTrucks.push(truck);
            }
        }

        let message = "Datos de camiones cargados en la base de datos.";
        
        if (createdTrucks.length > 0) {
            message += ` Camiones creados: ${createdTrucks.map((truck) => truck._id).join(", ")}.`;
        }

        if (existingTrucks.length > 0) {
            message += ` Camiones existentes: ${existingTrucks.map((truck) => truck._id).join(", ")}.`;
        }

        res.status(200).json({ message });
    } catch (error) {
        console.error("Error al cargar los datos de camiones:", error);
        res.status(500).json({ Error: "Error al cargar los datos de camiones en la base de datos." });
    }
};
