"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialUser = exports.validateUser = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    alias: zod_1.z.string({
        invalid_type_error: 'El alias debe ser un string!',
        required_error: 'El alias es requerido'
    }), // Puedo incluso ver la informacion del error
    nombre: zod_1.z.string(),
    apellido: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contraseña: zod_1.z.string(),
    rutaAvatar: zod_1.z.string().url({
        message: 'URL de ruta inválido'
    })
});
function validateUser(object) {
    return userSchema.safeParse(object);
}
exports.validateUser = validateUser;
function validatePartialUser(object) {
    return userSchema.partial().safeParse(object);
}
exports.validatePartialUser = validatePartialUser;
