import { ReactionModel } from '../models/mysql/reaction';
import { validateReaction} from '../schemas/reaction'
import { ResponseModel } from '../utils/Response';
import {Request, Response, NextFunction} from 'express';

export class ReactionController {

    // GET ALL
    static async getAllById(req:Request, res:Response, next:NextFunction) {
        try {
            const{id} = req.params;
            const reactions = await ReactionModel.getAllById({id});
            res.status(200).json(ResponseModel.success(reactions, 'Reacciones obtenidas correctamente'));
        } catch (error) {
            next(error);
        }
    }

    // GET REACTION BY ID
    static async getById(req:Request, res:Response, next:NextFunction) {
        const { id, idReaction } = req.params;

        try {
            const reactions = await ReactionModel.getById({ id, idReaction });
            if (reactions.length !== 0) {
                res.json(ResponseModel.success(reactions, 'Reacción obtenida correctamente'));
            } else {
                res.status(404).json(ResponseModel.error("La reacción no existe", 404));
            }
        } catch (error) {
            next(error);
        }
    }

    // CREATE NEW REACTION
    static async create(req:Request, res:Response, next:NextFunction):Promise<void>{
        const { id } = req.params;
        const result = validateReaction(req.body);
        if (result.error) {
            res.status(400).json(ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }

        try {
            const newReaction = await ReactionModel.create({ id, input: result.data });
            res.status(201).json(ResponseModel.success(newReaction, 'Reacción creada correctamente', 201));
        } catch (error) {
            next(error);
        }
    }

    // UPDATE REACTION
    // static async update(req, res, next) {
    //     const { id } = req.params;
    //     const result = validateReaction(req.body);

    //     if (result.error) {
    //         return res.status(400).json(ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
    //     }

    //     try {
    //         const updateReaction = await ReactionModel.update({ id, input: result.data });
    //         if (!updateReaction) {
    //             return res.status(404).json(ResponseModel.error('Reacción no encontrada', 404));
    //         }
    //         res.status(200).json(ResponseModel.success(updateReaction, 'Reacción actualizada correctamente'));
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // // DELETE REACTION (Logic)
    // static async delete(req, res, next) {
    //     const { id } = req.params;

    //     try {
    //         const success = await ReactionModel.delete({ id });
    //         if (!success) {
    //             return res.status(404).json(ResponseModel.error('Reacción no encontrada', 404));
    //         }
    //         res.status(200).json(ResponseModel.success(null, 'Reacción eliminada correctamente'));
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}