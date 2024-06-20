import { validateComment, validatePartialComment } from '../schemas/comment';
import { CommentModel } from '../models/mysql/comment';
import { Request, Response, NextFunction } from 'express';
import { ResponseModel } from '../utils/Response';

export class CommentController {

    // GET ALL COMMENTS BY PUBLICATION ID
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const comments = await CommentModel.getAll({ id });
            res.status(200).json(ResponseModel.success(comments, 'Comentarios obtenidos correctamente'));
        } catch (error) {
            next(error)
        }
    }

    // CREATE NEW COMMENT FOR A PUBLICATION
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const result = validateComment(req.body);

        if (result.error) {
            res.status(400).json(ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }

        try {
            const newComment = await CommentModel.create({ id, input: result.data });
            res.status(201).json(ResponseModel.success(newComment, 'Comentario creado correctamente', 201));
        } catch (error) {
            next(error);
        }
    }

    // UPDATE COMMENT
    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { idComment } = req.params;
        const result = validatePartialComment(req.body);

        if (result.error) {
            res.status(400).json(ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }

        try {
            const updateComment = await CommentModel.update({ idComment, input: result.data });
            if (!updateComment) {
                res.status(404).json(ResponseModel.error('Comentario no encontrado', 404));
                return;
            }
            res.status(200).json(ResponseModel.success(updateComment, 'Comentario actualizado correctamente'));
        } catch (error) {
            next(error);
        }
    }

    // DELETE COMMENT (Logic)
    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { idComment } = req.params;

        try {
            const success = await CommentModel.delete({ idComment });
            if (!success) {
                res.status(404).json(ResponseModel.error('Comentario no encontrado', 404));
                return;
            }
            res.status(200).json(ResponseModel.success(null, 'Comentario eliminado correctamente'));
        } catch (error) {
            next(error);
        }
    }
}
