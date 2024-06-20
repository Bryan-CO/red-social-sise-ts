"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationModel = void 0;
const promise_js_1 = __importDefault(require("mysql2/promise.js"));
const config_json_1 = __importDefault(require("../../../config.json"));
class PublicationModel {
    static async connect() {
        const connection = await promise_js_1.default.createConnection(config_json_1.default.development.db);
        return connection;
    }
    // GET ALL
    static async getAll() {
        const connection = await this.connect();
        const [pubs] = await connection.query('SELECT * FROM VW_PUB_SEL1_Lista;');
        const result = [];
        for (const pub of pubs) {
            const reacciones = await connection.query('SELECT RCT.IdTipoReaccion, RCT.Nombre, CTRC.Cant FROM cantreacciones CTRC INNER JOIN tiporeacciones RCT ON CTRC.IdTipoReaccion = RCT.IdTipoReaccion WHERE CTRC.IdPublicacion = ?;', [pub.IdPublicacion]);
            result.push(Object.assign(Object.assign({}, pub), { Reacciones: reacciones[0] }));
        }
        return result;
    }
    // GET BY ID
    static async getById({ id }) {
        const connection = await this.connect();
        const [pub] = await connection.query('SELECT * FROM VW_PUB_SEL1_Lista WHERE IdPublicacion = ?', [id]);
        return pub;
    }
    // CREATE
    static async create({ input }) {
        const { uuid_usuario, contenido } = input;
        const connection = await this.connect();
        await connection.query(`CALL SP_PUB_INS1_Registrar (UUID_TO_BIN(?), ?);`, [uuid_usuario, contenido]);
        const [newPub] = await connection.query('SELECT * FROM VW_PUB_SEL1_Lista WHERE IdPublicacion = LAST_INSERT_ID()');
        return newPub;
    }
    // UPDATE
    static async update({ id, input }) {
        const { contenido } = input;
        const connection = await this.connect();
        const [result] = await connection.query('CALL SP_PUB_UPD_Actualizar (?, ?);', [id, contenido]);
        if (result.affectedRows === 0)
            return false;
        const [pub] = await connection.query('SELECT * FROM VW_PUB_SEL1_Lista WHERE IdPublicacion = ?', [id]);
        return pub;
    }
    // DELETE
    static async delete({ id }) {
        const connection = await this.connect();
        const [result] = await connection.query('CALL SP_PUB_DEL1_INHABILITAR (?)', [id]);
        return (result.affectedRows === 1);
    }
}
exports.PublicationModel = PublicationModel;
