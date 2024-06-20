import mysql from 'mysql2/promise.js';
import config from '../../../config.json';

export class PublicationModel {

    static async connect() {
        const connection = await mysql.createConnection(config.development.db);
        return connection;
    }
    // GET ALL
    static async getAll(){
        const connection = await this.connect();
        const [pubs]:any = await connection.query(
            'SELECT * FROM VW_PUB_SEL1_Lista;'
        )
        const result = [];

        for (const pub of pubs){
            const reacciones = await connection.query('SELECT RCT.IdTipoReaccion, RCT.Nombre, CTRC.Cant FROM cantreacciones CTRC INNER JOIN tiporeacciones RCT ON CTRC.IdTipoReaccion = RCT.IdTipoReaccion WHERE CTRC.IdPublicacion = ?;', [pub.IdPublicacion])


            result.push({
                ...pub,
                Reacciones: reacciones[0]
            });
        }
        return result;  
    }

    // GET BY ID
    static async getById({ id }:any){
        const connection = await this.connect();
        const [pub] = await connection.query(
            'SELECT * FROM VW_PUB_SEL1_Lista WHERE IdPublicacion = ?', [id]
        )
        return pub;
    }

    // CREATE
    static async create({ input }: any){
        const{
            uuid_usuario,
            contenido
        } = input;

        const connection = await this.connect();

        await connection.query(
            `CALL SP_PUB_INS1_Registrar (UUID_TO_BIN(?), ?);`, [uuid_usuario, contenido]
        );

        const [newPub] = await connection.query(
            'SELECT * FROM VW_PUB_SEL1_Lista WHERE IdPublicacion = LAST_INSERT_ID()'
        );
        
        return newPub;
    }

    // UPDATE
    static async update({ id, input }: any){
        const{
            contenido
        } = input;

        const connection = await this.connect();

        const [result] : any = await connection.query(
            'CALL SP_PUB_UPD_Actualizar (?, ?);',
            [id, contenido]
        );

        if (result.affectedRows === 0) return false;

        const[pub] = await connection.query(
            'SELECT * FROM VW_PUB_SEL1_Lista WHERE IdPublicacion = ?', [id]
        );
        return pub;

    }

    // DELETE
    static async delete({ id } : any){

        const connection = await this.connect();

        const [result] : any = await connection.query(
            'CALL SP_PUB_DEL1_INHABILITAR (?)', [id]
        );

        return (result.affectedRows === 1);
    }
}