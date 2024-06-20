import mysql from 'mysql2/promise.js';
import config from '../../../config.json';


export class UserModel {
    
    static async connect() {
        const connection = await mysql.createConnection(config.development.db);
        return connection;
    }
    
    // GET ALL
    static async getAll(){
        const connection = await UserModel.connect();
        const [users] = await connection.query(
            'SELECT * FROM VW_USU_SEL_ALL_ACTIVE;'
        );
        await connection.end();
        return users;
    }

    // GET BY ID
    static async getById({ id }: any){
        const connection = await UserModel.connect();
        const [user] = await connection.query(
            'SELECT * FROM VW_USU_SEL_ALL_ACTIVE WHERE ID = ?', [id]
        );
        await connection.end();
        return user;
    }

    // CREATE
    static async create({ input }: any){
        const{
            alias,
            nombre,
            apellido,
            email,
            contraseña,
            rutaAvatar
        } = input;

        const connection = await UserModel.connect();

        const [uuidResult] : any = await connection.query(
            'SELECT UUID() uuid;'
        );

        

        const {uuid} = uuidResult[0];

        await connection.query(
            `CALL SP_USU_INS1_Registrar (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,[uuid, alias, nombre, apellido, email, contraseña, rutaAvatar]
        );

        const newUser = {
            id: uuid,
            ...input
        }
        
        return newUser;
    }

    // UPDATE
    static async update({ id, input } : any){
        const{
            alias,
            nombre,
            apellido,
            email,
            contraseña,
            rutaAvatar
        } = input;
        const connection = await UserModel.connect();

        const [result] : any = await connection.query(
            'CALL SP_USU_UPD2_ActDetalle (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)',
            [id, alias, nombre, apellido, email, contraseña, rutaAvatar]
        );

        if (result.affectedRows < 1) return false;

        const[user] = await connection.query(
            'SELECT * FROM VW_USU_SEL_ALL_ACTIVE WHERE ID = ?', [id]
        );
        return user;

    }

    // DELETE
    static async delete({ id }: any){
        const connection = await UserModel.connect();
        const [result] = await connection.query(
            'CALL SP_USU_DEL1_Inhabilitar(UUID_TO_BIN(?))', [id]
        );

        return (result);
    }
}