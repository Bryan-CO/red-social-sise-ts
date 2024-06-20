export class ResponseModel {
    status: string;
    code: number;
    data: any;
    message: string;

    constructor(status: string, code: number, data: any, message: string){ 
        this.status = status;
        this.code = code;
        this.data = data;
        this.message = message;
    }

    static success( data: any = null, message: string = 'OK', code: number = 200 ){
        return new ResponseModel('success', code, data, message);
    }
    
    static error( message = 'Ha ocurrido un error!', code = 500, details = null){
        return new ResponseModel('error', code, {details}, message );
    }
}