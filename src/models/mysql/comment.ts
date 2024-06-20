import mysql from 'mysql2/promise.js';
import config from '../../../config.json';


export class CommentModel {

    static async connect() {
        const connection = await mysql.createConnection(config.development.db);
        return connection;
    }
    // GET ALL COMMENTS
    static async getAll({ id } : any){
        const connection = await this.connect();
        const [pubs]:any = await connection.query(
            'CALL SP_COM_SEL1_PubComentarios(?);', [id]
        )
        return pubs[0];
    }

    // CREATE COMMENT
    static async create({ id, input }:any){
        const{
            uuid_usuario,
            contenido
        } = input;

        const connection = await this.connect();
        await connection.query(
            `CALL SP_COM_INS1_Registrar (?, UUID_TO_BIN(?), ?);`, [id, uuid_usuario, contenido]
        );

        const [newComment]:any = await connection.query(
            'CALL SP_COM_SEL1_ByID(LAST_INSERT_ID());'
        );
        
        return newComment[0];
    }

    // UPDATE COMMENT
    static async update({idComment, input }:any){
        const{
            contenido
        } = input;

        const connection = await this.connect();
        const [result]:any = await connection.query(
            'CALL SP_COM_UPD2_ACTCOMMET (?, ?)',
            [idComment, contenido]
        );

        console.log(idComment);

        if (result.affectedRows === 0) return false;

        const[comment]:any = await connection.query(
            'CALL SP_COM_SEL1_ByID(?);', [idComment]
        );
        return comment[0];

    }

    // DELETE COMMENT
    static async delete({ idComment }:any){
        const connection = await this.connect();
        const [result]:any = await connection.query(
            'CALL SP_COM_DEL1_INHABILITAR (?)', [idComment]
        );

        return (result.affectedRows === 1);
    }
}