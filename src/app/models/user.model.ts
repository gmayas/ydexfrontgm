export class userModel{

    constructor(id_user = 0, name_user ='', email_user = '', password_user = ''){
        this.id_user =id_user;
        this.name_user = name_user;
        this.email_user = email_user;
        this.password_user = password_user;
    }

    id_user: number ; 
    name_user: string; 
    email_user: string; 
    password_user: string;
};