"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_1 = require("../schemas/comment");
const comment_2 = require("../models/mysql/comment");
const Response_1 = require("../utils/Response");
class CommentController {
    // GET ALL COMMENTS BY PUBLICATION ID
    static async getAll(req, res, next) {
        const { id } = req.params;
        try {
            const comments = await comment_2.CommentModel.getAll({ id });
            res.status(200).json(Response_1.ResponseModel.success(comments, 'Comentarios obtenidos correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
    // CREATE NEW COMMENT FOR A PUBLICATION
    static async create(req, res, next) {
        const { id } = req.params;
        const result = (0, comment_1.validateComment)(req.body);
        if (result.error) {
            res.status(400).json(Response_1.ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }
        try {
            const newComment = await comment_2.CommentModel.create({ id, input: result.data });
            res.status(201).json(Response_1.ResponseModel.success(newComment, 'Comentario creado correctamente', 201));
        }
        catch (error) {
            next(error);
        }
    }
    // UPDATE COMMENT
    static async update(req, res, next) {
        const { idComment } = req.params;
        const result = (0, comment_1.validatePartialComment)(req.body);
        if (result.error) {
            res.status(400).json(Response_1.ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }
        try {
            const updateComment = await comment_2.CommentModel.update({ idComment, input: result.data });
            if (!updateComment) {
                res.status(404).json(Response_1.ResponseModel.error('Comentario no encontrado', 404));
                return;
            }
            res.status(200).json(Response_1.ResponseModel.success(updateComment, 'Comentario actualizado correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
    // DELETE COMMENT (Logic)
    static async delete(req, res, next) {
        const { idComment } = req.params;
        try {
            const success = await comment_2.CommentModel.delete({ idComment });
            if (!success) {
                res.status(404).json(Response_1.ResponseModel.error('Comentario no encontrado', 404));
                return;
            }
            res.status(200).json(Response_1.ResponseModel.success(null, 'Comentario eliminado correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CommentController = CommentController;
