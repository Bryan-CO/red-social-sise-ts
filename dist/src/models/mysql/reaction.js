"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionModel = void 0;
const promise_js_1 = __importDefault(require("mysql2/promise.js"));
const config_json_1 = __importDefault(require("../../../config.json"));
class ReactionModel {
    static async connect() {
        const connection = await promise_js_1.default.createConnection(config_json_1.default.development.db);
        return connection;
    }
    // GET ALL
    static async getAllById({ id }) {
        const connection = await this.connect();
        const [pubs] = await connection.query('SELECT BIN_TO_UUID(USU.IdUsuario) IdUsuario, USU.Alias, USU.rutaAvatar, PBRC.IdTipoReaccion, RCT.Nombre from publicacionreacciones PBRC INNER JOIN usuarios USU ON USU.IdUsuario = PBRC.IdUsuario INNER JOIN tiporeacciones RCT ON RCT.IdTipoReaccion = PBRC.IdTipoReaccion WHERE PBRC.IdPublicacion = ?;', [id]);
        // pubs.forEach(async pub => {
        //     const [reacciones] = await connection.
        // query('SELECT TRC.IDTipoReaccion, TRC.Nombre, CRC.Cant FROM CantReacciones CRC INNER JOIN TipoReacciones TRC ON TRC.IDTipoReaccion = CRC.IDTipoReaccion WHERE CRC.IDPublicacion = ? ORDER BY CRC.Cant DESC;', 20);
        //     pub.Reacciones = reacciones[0];
        // })
        return pubs;
    }
    // GET BY ID
    static async getById({ id, idReaction }) {
        const connection = await this.connect();
        const [reactions] = await connection.query('CALL SP_PBR_SEL1_ReaccionUsuario (?, ?);', [id, idReaction]);
        return reactions[0];
    }
    // CREATE
    static async create({ id, input }) {
        const { user_uuid, reaction_id } = input;
        const connection = await this.connect();
        await connection.query(`CALL SP_PBR_INS1_Agregar (?, UUID_TO_BIN(?), ?);`, [id, user_uuid, reaction_id]);
        return { message: "Se añadió una reacción!" };
    }
}
exports.ReactionModel = ReactionModel;
