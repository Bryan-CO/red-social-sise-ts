import { UUID } from "crypto";

export interface IUser {
    id: UUID,
    alias: string,
    nombre: string,
    apellido: string,
    email: string,
    contrasena: string
}