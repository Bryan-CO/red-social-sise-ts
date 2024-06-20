import { Request, Response, NextFunction } from 'express';
import { PublicationModel } from '../models/mysql/publication';
import { validatePublication, validatePartialPublication } from '../schemas/publication';
import { ResponseModel } from '../utils/Response';

export class PublicationController {

    // GET ALL
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pubs = await PublicationModel.getAll();
            res.status(200).json(ResponseModel.success(pubs, 'Publicaciones obtenidas correctamente'));
        } catch (error) {
            next(error);
        }
    }

    // GET BY ID
    static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const pub:any = await PublicationModel.getById({ id });
            if (pub.length != 0) {
                res.json(ResponseModel.success(pub, 'Publicación obtenida correctamente'));
            } else {
                res.status(404).json(ResponseModel.error("La publicación no existe", 404));
            }
        } catch (error) {
            next(error);
        }
    }

    // CREATE
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validatePublication(req.body);
        if (result.error) {
            res.status(400).json(ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }

        try {
            const newPub = await PublicationModel.create({ input: result.data });
            res.status(201).json(ResponseModel.success(newPub, 'Publicación creada correctamente', 201));
        } catch (error) {
            next(error);
        }
    }

    // UPDATE
    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const result = validatePartialPublication(req.body);

        if (result.error) {
            res.status(400).json(ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }

        try {
            const updatePub = await PublicationModel.update({ id, input: result.data });
            if (!updatePub) {
                res.status(404).json(ResponseModel.error('Publicación no encontrada', 404));
                return;
            }
            res.status(200).json(ResponseModel.success(updatePub, 'Publicación actualizada correctamente'));
        } catch (error) {
            next(error);
        }
    }

    // DELETE (Logic)
    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const success = await PublicationModel.delete({ id });
            if (!success) {
                res.status(404).json(ResponseModel.error('Publicación no encontrada', 404));
                return;
            }
            res.status(200).json(ResponseModel.success(null, 'Publicación eliminada correctamente'));
        } catch (error) {
            next(error);
        }
    }
}
