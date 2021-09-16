export interface User{
    idUser?:number,
    userName?:string
}

export interface UserLogin{
    userName:string,
    password:string
};

export interface ResLogin{
    id:number,
    ok:boolean,
    token:string,
    user:User
}
const domIP= "localhost";
export const urlSocket= `http://${domIP}:4001`;
export const urlServices= `${urlSocket}/api/`;