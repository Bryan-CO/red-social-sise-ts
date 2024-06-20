"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationController = void 0;
const publication_1 = require("../models/mysql/publication");
const publication_2 = require("../schemas/publication");
const Response_1 = require("../utils/Response");
class PublicationController {
    // GET ALL
    static async getAll(req, res, next) {
        try {
            const pubs = await publication_1.PublicationModel.getAll();
            res.status(200).json(Response_1.ResponseModel.success(pubs, 'Publicaciones obtenidas correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
    // GET BY ID
    static async getById(req, res, next) {
        const { id } = req.params;
        try {
            const pub = await publication_1.PublicationModel.getById({ id });
            if (pub.length != 0) {
                res.json(Response_1.ResponseModel.success(pub, 'Publicación obtenida correctamente'));
            }
            else {
                res.status(404).json(Response_1.ResponseModel.error("La publicación no existe", 404));
            }
        }
        catch (error) {
            next(error);
        }
    }
    // CREATE
    static async create(req, res, next) {
        const result = (0, publication_2.validatePublication)(req.body);
        if (result.error) {
            res.status(400).json(Response_1.ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }
        try {
            const newPub = await publication_1.PublicationModel.create({ input: result.data });
            res.status(201).json(Response_1.ResponseModel.success(newPub, 'Publicación creada correctamente', 201));
        }
        catch (error) {
            next(error);
        }
    }
    // UPDATE
    static async update(req, res, next) {
        const { id } = req.params;
        const result = (0, publication_2.validatePartialPublication)(req.body);
        if (result.error) {
            res.status(400).json(Response_1.ResponseModel.error('Validación fallida', 400, JSON.parse(result.error.message)));
            return;
        }
        try {
            const updatePub = await publication_1.PublicationModel.update({ id, input: result.data });
            if (!updatePub) {
                res.status(404).json(Response_1.ResponseModel.error('Publicación no encontrada', 404));
                return;
            }
            res.status(200).json(Response_1.ResponseModel.success(updatePub, 'Publicación actualizada correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
    // DELETE (Logic)
    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            const success = await publication_1.PublicationModel.delete({ id });
            if (!success) {
                res.status(404).json(Response_1.ResponseModel.error('Publicación no encontrada', 404));
                return;
            }
            res.status(200).json(Response_1.ResponseModel.success(null, 'Publicación eliminada correctamente'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PublicationController = PublicationController;
