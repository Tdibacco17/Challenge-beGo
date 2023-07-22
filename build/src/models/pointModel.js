"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pointSchema = new mongoose_1.Schema({
    location: {
        name: {
            type: String,
            required: true,
        },
        placeId: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
});
const PointModel = (0, mongoose_1.model)("Point", pointSchema);
exports.default = PointModel;
//# sourceMappingURL=pointModel.js.map