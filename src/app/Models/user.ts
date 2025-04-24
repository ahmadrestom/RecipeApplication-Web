enum Role{
    USER, ADMIN, CHEF
}

export interface User {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    imageUrl:string;
    role:Role;
}
