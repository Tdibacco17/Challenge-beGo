import { Request, Response } from "express";
import RouteModel from "../models/routeModel";

// Supongamos que ya tienes configurada la API key de Google Maps
const apiKey = "GOOGLE_APIKEY"; //process.env.GOOGLE_APIKEY

export const createRoute = async (req: Request, res: Response) => {
    const { pointAPlaceId, pointBPlaceId } = req.body;

    try {
        // Obtener coordenadas de PointA
        const pointAResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pointAPlaceId}&key=${apiKey}`
        );
        const pointAData = await pointAResponse.json();
        const pointACoordinates = pointAData?.result?.geometry?.location || null;

        if (!pointACoordinates) {
            res.status(404).json({ error: "No se encontraron coordenadas para PointA" });
            return;
        }

        // Obtener coordenadas de PointB
        const pointBResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pointBPlaceId}&key=${apiKey}`
        );
        const pointBData = await pointBResponse.json();
        const pointBCoordinates = pointBData?.result?.geometry?.location || null;

        if (!pointBCoordinates) {
            res.status(404).json({ error: "No se encontraron coordenadas para PointB" });
            return;
        }

        // Calcular la distancia entre los puntos (solo un ejemplo, puede variar dependiendo de tu lógica)
        const distanceInKm = calculateDistance(pointACoordinates, pointBCoordinates);

        // Crear una nueva ruta utilizando el modelo y guardarla en la base de datos
        const route = new RouteModel({
            pointA: { placeId: pointAPlaceId, coordinates: pointACoordinates },
            pointB: { placeId: pointBPlaceId, coordinates: pointBCoordinates },
            distance: distanceInKm,
        });

        await route.save();

        // Responder con la ruta creada
        res.json({ message: "Ruta creada exitosamente", route });
    } catch (error) {
        console.error("Error al crear la ruta:", error);
        res.status(500).json({ error: "Error al crear la ruta" });
    }
};

// Función para calcular la distancia entre dos coordenadas (solo un ejemplo, puedes utilizar la lógica adecuada)
function calculateDistance(pointA: { lat: number; lng: number }, pointB: { lat: number; lng: number }): number {
    const earthRadiusKm = 6371; // Radio de la Tierra en kilómetros

    // Convertir las coordenadas de grados a radianes
    const latAInRad = degToRad(pointA.lat);
    const latBInRad = degToRad(pointB.lat);
    const lngAInRad = degToRad(pointA.lng);
    const lngBInRad = degToRad(pointB.lng);

    // Calcular la diferencia entre las latitudes y longitudes en radianes
    const latDiff = latBInRad - latAInRad;
    const lngDiff = lngBInRad - lngAInRad;

    // Calcular la distancia utilizando la fórmula de Haversine
    const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(latAInRad) * Math.cos(latBInRad) * Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadiusKm * c;

    return distanceKm;
}

function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
}