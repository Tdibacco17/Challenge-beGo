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
exports.loadTrucksData = exports.listValidTrucks = void 0;
const truckModel_1 = __importDefault(require("../models/truckModel"));
const trucks_json_1 = __importDefault(require("../../docs/trucks.json"));
const listValidTrucks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validTrucks = yield truckModel_1.default.aggregate([
            {
                $match: { year: { $gt: 2020 } }
            }
        ]).exec();
        if (validTrucks.length === 0) {
            res.status(404).json({ error: "No se encontraron camiones válidos en la base de datos." });
        }
        res.json(validTrucks);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los camiones válidos" });
    }
});
exports.listValidTrucks = listValidTrucks;
const loadTrucksData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!trucks_json_1.default || trucks_json_1.default.length === 0) {
            res.status(400).json({ error: "No se encontraron datos de camiones para cargar." });
        }
        const transformedTrucks = trucks_json_1.default.map((truck) => {
            return Object.assign(Object.assign({}, truck), { _id: truck._id.$oid });
        });
        const createdTrucks = [];
        const existingTrucks = [];
        for (const truck of transformedTrucks) {
            const existingTruck = yield truckModel_1.default.findOne({ _id: truck._id });
            if (existingTruck) {
                existingTrucks.push(truck);
            }
            else {
                yield truckModel_1.default.create(truck);
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
    }
    catch (error) {
        console.error("Error al cargar los datos de camiones:", error);
        res.status(500).json({ Error: "Error al cargar los datos de camiones en la base de datos." });
    }
});
exports.loadTrucksData = loadTrucksData;
//# sourceMappingURL=truckController.js.map