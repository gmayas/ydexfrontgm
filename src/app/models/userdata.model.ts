export class userDataModel{

    constructor(id_userdata = 0, id_user_userdata = 0, address_userdata = '', phone_userdata = '', birthdate_userdata = '', age_userdata = {}    ){

        this.id_userdata = id_userdata;
        this.id_user_userdata = id_user_userdata;
        this.address_userdata = address_userdata;
        this.phone_userdata = phone_userdata;
        this.birthdate_userdata = birthdate_userdata;
        this.age_userdata = age_userdata;    
       
    }
      id_userdata: number;
      id_user_userdata: number;
      address_userdata: string;
      phone_userdata: string;
      birthdate_userdata: string;
      age_userdata: {};
    
};