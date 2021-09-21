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
  private infoUser$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.selectUser = new userModel;
    this.selectUserData = new userDataModel;
    this.infoUser$.next(null);
  }

  // Función que retorna la informacion de los usuarios (lista)
  async getUsers() {
    return await fetch(`${environment.api_url}/getUsers`);
  };

  // Función que retorna la informacion de creacion usuario 
  async createUser(bodyIn: any) {
    const paramsJson = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyIn)
    };
    return await fetch(`${environment.api_url}/createUser`, paramsJson);
  };

  // Función que retorna la informacion de modificación usuario 
  // Solo mofica el password del suario
  async modifyPassword(id_user: any, bodyIn: any) {
    const paramsJson = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyIn)
    };
    return await fetch(`${environment.api_url}/modifyPassword/${id_user}`, paramsJson);
  };

  // Función que retorna la informacion usuario eliminado full
  async deleteUsers(id_user: any) {
    const paramsJson = { method: 'DELETE' };
    return await fetch(`${environment.api_url}/deleteUser/${id_user}`, paramsJson);
  };

  // Función que retorna datos del usuario (lista)
  getUserData(id_user: any) {
    return fetch(`${environment.api_url}/getUserDataByIdUser/${id_user}`);
  };

  // Función que asigna a la varible la informacion del usuario
  setInfoUser(user: any) {
    this.infoUser$.next(user);
  }

  // Función que retorna la informacion del usuario 
  getInfoUser() {
    return this.infoUser$;
  }

  // Función que retorna la informacion de creacion datos usuario 
  async createUserData(bodyIn: any) {
    const paramsJson = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyIn)
    };
    return await fetch(`${environment.api_url}/createUserData`, paramsJson);
  };

  // Función que retorna la informacion de modificación datos usuario 
  async modifyUserData(id_userdata: any, bodyIn: any) {
    const paramsJson = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyIn)
    };
    return await fetch(`${environment.api_url}/modifyUserData/${id_userdata}`, paramsJson);
  };

  // Función que retorna la informacion datos usuario eliminado full
  async deleteUserData(id_userdata: any) {
    const paramsJson = { method: 'DELETE' };
    return await fetch(`${environment.api_url}/deleteUserData/${id_userdata}`, paramsJson);
  };

}
