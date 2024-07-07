export interface IUser 
{
    id: number;
    name: string;
    correo: string;
    password: string;
    clave: string;
    salt: string;
    isAdmin: boolean;
}