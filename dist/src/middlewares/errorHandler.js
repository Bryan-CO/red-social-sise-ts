"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Response_1 = require("../utils/Response");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json(Response_1.ResponseModel.error('Internal server error', status, message));
};
exports.errorHandler = errorHandler;
