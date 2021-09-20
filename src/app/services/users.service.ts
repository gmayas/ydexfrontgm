import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { userModel } from '../models/user.model';
import { userDataModel } from '../models/userdata.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public selectUser: userModel;
  public selectUserData: userDataModel;

  // Varible de tipo BehaviorSubject para el almacenaje dinamico y que cualquier componente que lo requiara. 
  private infoUserData$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.selectUser = new userModel;
    this.selectUserData = new userDataModel;
    this.infoUserData$.next(null);
  }

  // Función que retorna la informacion de los usuarios (lista)
  async getUsers() {
    return await fetch(`${environment.api_url}/getUsers`);
  };

  // Función que retorna datos del usuario (lista)
  getUserData(id_user: any) {
    return fetch(`${environment.api_url}/getUserDataByIdUser/${id_user}`);
  };

  // Función que asigna a la varible la informacion datos del usuario
  setInfoUserData(userData: any) {
    this.infoUserData$.next(userData);
  }

  // Función que retorna la informacion datos del usuario 
  getInfoUserData() {
    return this.infoUserData$;
  }

}
