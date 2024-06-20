"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const promise_js_1 = __importDefault(require("mysql2/promise.js"));
const config_json_1 = __importDefault(require("../../../config.json"));
class CommentModel {
    static async connect() {
        const connection = await promise_js_1.default.createConnection(config_json_1.default.development.db);
        return connection;
    }
    // GET ALL COMMENTS
    static async getAll({ id }) {
        const connection = await this.connect();
        const [pubs] = await connection.query('CALL SP_COM_SEL1_PubComentarios(?);', [id]);
        return pubs[0];
    }
    // CREATE COMMENT
    static async create({ id, input }) {
        const { uuid_usuario, contenido } = input;
        const connection = await this.connect();
        await connection.query(`CALL SP_COM_INS1_Registrar (?, UUID_TO_BIN(?), ?);`, [id, uuid_usuario, contenido]);
        const [newComment] = await connection.query('CALL SP_COM_SEL1_ByID(LAST_INSERT_ID());');
        return newComment[0];
    }
    // UPDATE COMMENT
    static async update({ idComment, input }) {
        const { contenido } = input;
        const connection = await this.connect();
        const [result] = await connection.query('CALL SP_COM_UPD2_ACTCOMMET (?, ?)', [idComment, contenido]);
        console.log(idComment);
        if (result.affectedRows === 0)
            return false;
        const [comment] = await connection.query('CALL SP_COM_SEL1_ByID(?);', [idComment]);
        return comment[0];
    }
    // DELETE COMMENT
    static async delete({ idComment }) {
        const connection = await this.connect();
        const [result] = await connection.query('CALL SP_COM_DEL1_INHABILITAR (?)', [idComment]);
        return (result.affectedRows === 1);
    }
}
exports.CommentModel = CommentModel;
