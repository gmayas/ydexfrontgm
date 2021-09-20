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
  userForm!: FormGroup;
  loading = false;
  confirm = false;
  loadingData = false
  submitted = false;

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
      //
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
      //save user
      this.submitted = false;
      this.confirm = false;
      this.loadingData = false;
      this.onReset();
      this.getUsers();
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
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
    this.submitted = false;
    this.loading = false;
    this.loadingData = false;
    this.usersService.selectUser = new userModel();
    this.userForm.controls['name_user'].enable({onlySelf: true});
    this.userForm.controls['email_user'].enable({onlySelf: true});
    this.userForm.reset();
  }

  // Función asincrona para obtener el listado de los usuarios
  async getUsers() {
    try {
      this.loadingData = true;
      let response = await this.usersService.getUsers();
      let dataReturn = await response.json()
      this.Users = dataReturn.data;
      console.log('Users: ', this.Users);
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

  // Función asincrona para obtener la informacion completa del personaje proveniente del apiServices
  async getUserData(user: any) {
    try {
      this.loadingData = true;
      let response = await this.usersService.getUserData(user.id_user);
      let dataReturn = await response.json();
      let userData = dataReturn.data;
      console.log('userData: ', userData);
      this.usersService.setInfoUserData(userData);
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
    this.usersService.selectUser = Object.assign({}, user);
    this.userForm.controls['name_user'].disable({onlySelf: true});
    this.userForm.controls['email_user'].disable({onlySelf: true});
  }

  deleteUser() {
    try {
      this.loadingData = true;
      this.confirm = true;
      //Delete user
      console.log('this.delUserSel:', this.delUserSel);   
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
    console.log('this.delUserSel:', this.delUserSel);
    this.modalService.open(content, { centered: true });
  }
}
