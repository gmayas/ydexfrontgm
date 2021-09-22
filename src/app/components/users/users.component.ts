import { Component, OnInit, OnChanges } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { userModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnChanges {

  // Users
  public Users: any;
  public delUserSel: any = {};
  //
  public yyyy = new Date().getFullYear();
  public userForm!: FormGroup;
  loading = false;
  confirm = false;
  loadingData = false
  submitted = false;
  editing = true;

  constructor(public usersService: UsersService, private router: Router, private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    // Llamado inicial de la funcion
    this.getUsers();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id_user: [null],
      name_user: [{ value: '', disabled: false }, [Validators.required]],
      email_user: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      password_user: [{ value: '', disabled: false }, [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  ngOnChanges() {
    // Llamado inicial de la funcion
    this.getUsers();
  }

  onSubmit() {
    try {
      let newData: any = {};
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
      // stop here if form is invalid
      if (this.userForm.invalid) {
        this.toastr.error('Hola, tienes que completar el formulario.', 'Aviso de Yaydoo FrontEnd', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
        this.loadingData = false;
        return;
      }
      //Save user data
      newData = this.userForm.value;
      if (_.isNil(newData.id_user) || newData.id_user == 0) {
        this.createUser(newData);
      } else {
        this.modifyPassword(newData.id_user, newData);
      }
    } catch (e) {
      this.submitted = false;
      this.confirm = false;
      this.loadingData = false;
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

  onReset() {
    this.getUsers();
    this.submitted = false;
    this.loading = false;
    this.loadingData = false;
    this.editing = true;
    this.usersService.selectUser = new userModel();
    this.userForm.controls['name_user'].enable({ onlySelf: true });
    this.userForm.controls['email_user'].enable({ onlySelf: true });
    this.userForm.reset();
  }

  // Función asincrona para obtener el listado de los usuarios
  async getUsers() {
    try {
      this.loadingData = true;
      let response = await this.usersService.getUsers();
      let dataReturn = await response.json()
      this.Users = dataReturn.data;
      this.loadingData = false;
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
    } catch (e) {
      this.loadingData = false;
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

  // Función asincrona para setirar informacion del usuario
  async setInfoUser(user: any) {
    try {
      this.loadingData = true;
      await this.usersService.setInfoUser(user);
      this.loadingData = false;
      this.router.navigate(['userdata']);
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
    } catch (e) {
      this.loadingData = false;
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

  editUser(user: any) {
    this.editing = false;
    this.usersService.selectUser = Object.assign({}, user);
    this.userForm.controls['name_user'].disable({ onlySelf: true });
    this.userForm.controls['email_user'].disable({ onlySelf: true });
  }

  // Función que retorna la informacion de creacion usuario 
  async createUser(bodyIn: any) {
    try {
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
      //Create user
      let response = await this.usersService.createUser(bodyIn);
      let dataReturn = await response.json();
      this.submitted = false;
      this.loading = false;
      this.loadingData = false;
      this.onReset();
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
    } catch (e) {
      this.submitted = false;
      this.loading = false;
      this.loadingData = false;
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

  // Función que retorna la informacion de modificación usuario 
  // Solo mofica el password del suario
  async modifyPassword(id_user: any, bodyIn: any) {
    try {
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
      //Modify user
      let response = await this.usersService.modifyPassword(id_user, bodyIn);
      let dataReturn = await response.json();
      this.submitted = false;
      this.loading = false;
      this.loadingData = false;
      this.onReset();
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
    } catch (e) {
      this.submitted = false;
      this.loading = false;
      this.loadingData = false;
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

  // Función asincrona para eliminar la informacion completa del usuario
  async deleteUser() {
    try {
      this.loadingData = true;
      this.confirm = true;
      //Delete user
      let response = await this.usersService.deleteUsers(this.delUserSel.id_user);
      let dataReturn = await response.json();
      this.loadingData = false;
      this.confirm = false;
      this.onReset();
      this.getUsers();
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
    } catch (e) {
      this.loadingData = false;
      this.confirm = false;
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

  open(content: any, user: any) {
    this.delUserSel = Object.assign({}, user);
    this.modalService.open(content, { centered: true });
  }
}
