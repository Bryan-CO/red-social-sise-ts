"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialComment = exports.validateComment = void 0;
const zod_1 = require("zod");
const commentSchema = zod_1.z.object({
    uuid_usuario: zod_1.z.string().uuid(),
    contenido: zod_1.z.string()
});
function validateComment(object) {
    return commentSchema.safeParse(object);
}
exports.validateComment = validateComment;
function validatePartialComment(object) {
    return commentSchema.partial().safeParse(object);
}
exports.validatePartialComment = validatePartialComment;
