"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialPublication = exports.validatePublication = void 0;
const zod_1 = require("zod");
const publicationSchema = zod_1.z.object({
    uuid_usuario: zod_1.z.string().uuid(),
    contenido: zod_1.z.string()
});
function validatePublication(object) {
    return publicationSchema.safeParse(object);
}
exports.validatePublication = validatePublication;
function validatePartialPublication(object) {
    return publicationSchema.partial().safeParse(object);
}
exports.validatePartialPublication = validatePartialPublication;
