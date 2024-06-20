"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../models/mysql/user");
const user_2 = require("../schemas/user");
const Response_1 = require("../utils/Response");
class UserController {
    // GET ALL
    static async getAll(_req, res, next) {
        try {
            const users = await user_1.UserModel.getAll();
            res.status(200).json(Response_1.ResponseModel.success(users, 'Se listó correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
    // GET BY ID
    static async getById(req, res) {
        const { id } = req.params;
        const user = await user_1.UserModel.getById({ id });
        if (user) {
            res.json(Response_1.ResponseModel.success(user, 'Usuario obtenido correctamente!'));
        }
        else {
            res.status(404).json(Response_1.ResponseModel.error('Usuario no encontrado', 404));
        }
    }
    // CREATE
    static async create(req, res, next) {
        try {
            const result = (0, user_2.validateUser)(req.body);
            if (result.error) {
                res.status(400).json(Response_1.ResponseModel.error('Usuario no fue validado correctamente', 400, JSON.parse(result.error.message)));
                return;
            }
            const newUser = await user_1.UserModel.create({ input: result.data });
            res.status(201).json(Response_1.ResponseModel.success(newUser, 'Usuario creado correctamente!', 201));
        }
        catch (error) {
            next(error);
        }
    }
    // UPDATE
    static async update(req, res) {
        const { id } = req.params;
        const result = (0, user_2.validatePartialUser)(req.body);
        if (result.error) {
            res.status(400).json(Response_1.ResponseModel.error('Usuario no fue validado correctamente', 400, JSON.parse(result.error.message)));
            return;
        }
        const updateUser = await user_1.UserModel.update({ id, input: result.data });
        if (!updateUser) {
            res.status(404).json(Response_1.ResponseModel.error('Usuario no encontrado', 404));
        }
        else {
            res.status(200).json(Response_1.ResponseModel.success(updateUser, 'Usuario actualizado correctamente!'));
        }
    }
    // DELETE (Logic)
    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            const success = await user_1.UserModel.delete({ id });
            if (!success) {
                res.status(404).json(Response_1.ResponseModel.error('Usuario no encontrado', 404));
            }
            else {
                res.json(Response_1.ResponseModel.success(null, 'Usuario eliminado correctamente'));
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
