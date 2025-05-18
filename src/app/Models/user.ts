export enum Role{
    "USER", "ADMIN", "CHEF"
}

export interface User {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    imageUrl:string;
    role:Role;
}

export interface SignUpModel{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}