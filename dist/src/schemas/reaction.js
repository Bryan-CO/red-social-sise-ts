"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialReaction = exports.validateReaction = void 0;
const zod_1 = __importDefault(require("zod"));
const reactionSchema = zod_1.default.object({
    user_uuid: zod_1.default.string().uuid(),
    reaction_id: zod_1.default.number().positive().max(5)
});
function validateReaction(object) {
    return reactionSchema.safeParse(object);
}
exports.validateReaction = validateReaction;
function validatePartialReaction(object) {
    return reactionSchema.partial().safeParse(object);
}
exports.validatePartialReaction = validatePartialReaction;
