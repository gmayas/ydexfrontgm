import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public selectUser: userModel;

  // Varible de tipo BehaviorSubject para el almacenaje dinamico y que cualquier componente que lo requiara. 
  private infoUserData$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.selectUser = new userModel; 
   // Se inicializa vacia 
   this.infoUserData$.next(null); 
   }

   // Función que retorna la informacion de los usuarios (lista)
  async getUsers() {
    return await fetch('http://localhost:5000/api/user/getUsers')
  };

  // Función que retorna datos del usuario (lista)
  getUserData(id_user: any) {
    return fetch(`http://localhost:5000/api/user/getUserDataByIdUser/${id_user}`)
  };

   // Función que asigna a la varible la informacion datos del usuario
   setInfoUserData(userData: any){
    this.infoUserData$.next(userData);
  }

  // Función que retorna la informacion datos del usuario 
  getInfoUserData() {
    return this.infoUserData$;
  }

}
