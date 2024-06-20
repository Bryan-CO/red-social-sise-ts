import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/mysql/user';
import { validatePartialUser, validateUser } from '../schemas/user';
import { ResponseModel } from '../utils/Response';

export class UserController {

    // GET ALL
    static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await UserModel.getAll();
            res.status(200).json(ResponseModel.success(users, 'Se listó correctamente'));
        } catch (error) {
            next(error);
        }
    }


    // GET BY ID
    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await UserModel.getById({ id });
        if (user) {
            res.json(ResponseModel.success(user, 'Usuario obtenido correctamente!'));
        } else {
            res.status(404).json(ResponseModel.error('Usuario no encontrado', 404));
        }
    }

    // CREATE
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = validateUser(req.body);
            if (result.error) {
                res.status(400).json(ResponseModel.error('Usuario no fue validado correctamente', 400, JSON.parse(result.error.message)));
                return;
            }
            const newUser = await UserModel.create({ input: result.data });
            res.status(201).json(ResponseModel.success(newUser, 'Usuario creado correctamente!', 201));
        } catch (error) {
            next(error);
        }
    }

    // UPDATE
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const result = validatePartialUser(req.body);

        if (result.error) {
            res.status(400).json(ResponseModel.error('Usuario no fue validado correctamente', 400, JSON.parse(result.error.message)));
            return;
        }

        const updateUser = await UserModel.update({ id, input: result.data });

        if (!updateUser) {
            res.status(404).json(ResponseModel.error('Usuario no encontrado', 404));
        } else {
            res.status(200).json(ResponseModel.success(updateUser, 'Usuario actualizado correctamente!'));
        }
    }

    // DELETE (Logic)
    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const success = await UserModel.delete({ id });
            if (!success) {
                res.status(404).json(ResponseModel.error('Usuario no encontrado', 404));
            } else {
                res.json(ResponseModel.success(null, 'Usuario eliminado correctamente'));
            }
        } catch (error) {
            next(error);
        }
    }
}