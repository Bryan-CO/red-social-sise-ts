"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const ACCEPTED_ORIGINS = [
    'http://localhost:5500',
    'http://localhost:3000',
    'http://redsocial.com.pe'
];
function corsMiddleware() {
    const options = {
        origin: (origin, callback) => {
            if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Dominio no permitido :('));
            }
        }
    };
    return (0, cors_1.default)(options);
}
exports.corsMiddleware = corsMiddleware;
