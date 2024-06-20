"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionController = void 0;
const reaction_1 = require("../models/mysql/reaction");
const reaction_2 = require("../schemas/reaction");
const Response_1 = require("../utils/Response");
class ReactionController {
    // GET ALL
    static async getAllById(req, res, next) {
        try {
            const { id } = req.params;
            const reactions = await reaction_1.ReactionModel.getAllById({ id });
            res.status(200).json(Response_1.ResponseModel.success(reactions, 'Reacciones obtenidas correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
    // GET REACTION BY ID
    static async getById(req, res, next) {
        const { id, idReaction } = req.params;
        try {
            const reactions = await reaction_1.ReactionModel.getById({ id, idReaction });
            if (reactions.length !== 0) {
                res.json(Response_1.ResponseModel.success(reactions, 'Reacción obtenida correctamente'));
            }
            else {
                res.status(404).json(Response_1.ResponseModel.error("La reacción no existe", 404));
            }
        }
        catch (error) {
            next(error);
        }
    }
    // CREATE NEW REACTION
    static async create(req, res, next) {
        const { id } = req.params;
        const result = (0, reaction_2.validateReaction)(req.body);
        if (result.error) {
            res.status(400).json(Response_1.ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }
        try {
            const newReaction = await reaction_1.ReactionModel.create({ id, input: result.data });
            res.status(201).json(Response_1.ResponseModel.success(newReaction, 'Reacción creada correctamente', 201));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReactionController = ReactionController;
