"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const promise_js_1 = __importDefault(require("mysql2/promise.js"));
const config_json_1 = __importDefault(require("../../../config.json"));
class UserModel {
    static async connect() {
        const connection = await promise_js_1.default.createConnection(config_json_1.default.development.db);
        return connection;
    }
    // GET ALL
    static async getAll() {
        const connection = await UserModel.connect();
        const [users] = await connection.query('SELECT * FROM VW_USU_SEL_ALL_ACTIVE;');
        await connection.end();
        return users;
    }
    // GET BY ID
    static async getById({ id }) {
        const connection = await UserModel.connect();
        const [user] = await connection.query('SELECT * FROM VW_USU_SEL_ALL_ACTIVE WHERE ID = ?', [id]);
        await connection.end();
        return user;
    }
    // CREATE
    static async create({ input }) {
        const { alias, nombre, apellido, email, contraseña, rutaAvatar } = input;
        const connection = await UserModel.connect();
        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const { uuid } = uuidResult[0];
        await connection.query(`CALL SP_USU_INS1_Registrar (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`, [uuid, alias, nombre, apellido, email, contraseña, rutaAvatar]);
        const newUser = Object.assign({ id: uuid }, input);
        return newUser;
    }
    // UPDATE
    static async update({ id, input }) {
        const { alias, nombre, apellido, email, contraseña, rutaAvatar } = input;
        const connection = await UserModel.connect();
        const [result] = await connection.query('CALL SP_USU_UPD2_ActDetalle (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)', [id, alias, nombre, apellido, email, contraseña, rutaAvatar]);
        if (result.affectedRows < 1)
            return false;
        const [user] = await connection.query('SELECT * FROM VW_USU_SEL_ALL_ACTIVE WHERE ID = ?', [id]);
        return user;
    }
    // DELETE
    static async delete({ id }) {
        const connection = await UserModel.connect();
        const [result] = await connection.query('CALL SP_USU_DEL1_Inhabilitar(UUID_TO_BIN(?))', [id]);
        return (result);
    }
}
exports.UserModel = UserModel;
