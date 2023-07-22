"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPointsData = exports.listValidPoints = void 0;
const pointModel_1 = __importDefault(require("../models/pointModel"));
const points_json_1 = __importDefault(require("../../docs/points.json"));
const listValidPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validPoints = yield pointModel_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los puntos válidos." });
    }
});
exports.listValidPoints = listValidPoints;
const loadPointsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!points_json_1.default || points_json_1.default.length === 0) {
            res.status(400).json({ error: "No se encontraron datos de puntos para cargar." });
        }
        const transformedPoints = points_json_1.default.map((point) => {
            return Object.assign(Object.assign({}, point), { _id: point._id.$oid });
        });
        const createdPoints = [];
        const existingPoints = [];
        for (const point of transformedPoints) {
            const existingPoint = yield pointModel_1.default.findOne({ _id: point._id });
            if (existingPoint) {
                existingPoints.push(point);
            }
            else {
                yield pointModel_1.default.create(point);
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
    }
    catch (error) {
        console.error("Error al cargar los datos de puntos:", error);
        res.status(500).json({ Error: "Error al cargar los datos de puntos en la base de datos." });
    }
});
exports.loadPointsData = loadPointsData;
//# sourceMappingURL=pointController.js.map