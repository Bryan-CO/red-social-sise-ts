"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status404 = void 0;
const status404 = () => {
    return (req, res, next) => {
        res.status(404).send('<h1>404 :(</h1>');
    };
};
exports.status404 = status404;
