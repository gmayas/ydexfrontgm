import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { userDataModel } from '../../models/userdata.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  //
  public yyyy = new Date().getFullYear();
  // Variable para datos del usuario
  public User: any;
  public UserData: any;
  public delUserDataSel: any = {};
  public dataHead: any;
  public userDataForm!: FormGroup;
  public loading = false;
  public confirm = false;
  public loadingData = false
  public submitted = false;
  //
  public columnas: any = [];;
  public data = [];
  public dataSize = 0;
  public dataSource: any = new MatTableDataSource();
  public searchValue: string | any = '';
  public pageEvent: PageEvent | any;
   // Templates
   @ViewChild('accionTemplate', { static: true }) accionTemplate: TemplateRef<any> | any;
   //
  constructor(public usersService: UsersService, private router: Router, private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userDataForm = this.formBuilder.group({
      id_userdata: [null],
      id_user_userdata: [null],
      address_userdata: [{ value: '', disabled: false }, [Validators.required]],
      phone_userdata: [{ value: '', disabled: false }, [Validators.required]],
      birthdate_userdata: [{ value: '', disabled: false }, [Validators.required]]
    });
    this.getTableColums(); 
    this.getInfoUser();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userDataForm.controls; }

  onSubmit() {
    try {
     
      let newData: any = {};
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
       // stop here if form is invalid
      if (this.userDataForm.invalid) {
        this.toastr.error('Hola, tienes que completar el formulario.', 'Aviso de Yaydoo FrontEnd', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
        this.loadingData = false;
        return;
      }
      //Save user data
      newData = this.userDataForm.value;
      newData.id_user_userdata = _.get(this.User.value, 'id_user');
      if (_.isNil(newData.id_userdata) || newData.id_userdata == 0) {
        this.createUserData(newData);
      } else {
        this.modifyUserData(newData.id_userdata, newData);
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
    this.getInfoUser();
    this.submitted = false;
    this.loading = false;
    this.loadingData = false;
    this.usersService.selectUserData = new userDataModel();
    this.userDataForm.reset();
  }

  getInfoUser() {
    this.User = this.usersService.getInfoUser();
    this.toDataHead(this.User.value);
    this.getUserData(this.User.value);
  }

  editUserData(userData: any) {
    userData.birthdate_userdata = this.fechaCorta(userData.birthdate_userdata);
    this.usersService.selectUserData = Object.assign({}, userData);
  }

  getTableColums() {
    //this.columns = ['Nombre', 'Email', 'Password'];
    this.columnas = [
      { campo: 'address_userdata', titulo: 'Dirección', cellTemplate: null },
      { campo: 'phone_userdata', titulo: 'Teléfono', cellTemplate: null },
      { campo: 'birthdate_userdata', titulo: 'Fecha de nacimiento', cellTemplate: null },
      { campo: 'age_userdata', titulo: 'Edad', cellTemplate: null },
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate },
    ];
  }

  // Función asincrona para obtener la informacion completa del usuario
  async getUserData(user: any) {
    try {
      this.loadingData = true;
      let response = await this.usersService.getUserData(user.id_user);
      let dataReturn = await response.json();
      this.UserData = dataReturn.data.map(
        (value: any) => {
          const res = {
            id_userdata: value.id_userdata,
            id_user_userdata: value.id_user_userdata,
            address_userdata: value.address_userdata,
            phone_userdata: value.phone_userdata,
            birthdate_userdata: this.fechaCorta(value.birthdate_userdata),
            age_userdata: this.toEdad(value.age_userdata)
          };
          return res;
        }
      );
      console.log('this.UserData:', this.UserData)
      this.dataSource = new MatTableDataSource(this.UserData);
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

  // Función que retorna la informacion de creacion datos usuario 
  async createUserData(bodyIn: any) {
    try {
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
      //Create user
      let response = await this.usersService.createUserData(bodyIn);
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

  // Función que retorna la informacion de modificación datos usuario 
  async modifyUserData(id_userdata: any, bodyIn: any) {
    try {
      this.submitted = true;
      this.loading = true;
      this.loadingData = true;
      //Modify user
      let response = await this.usersService.modifyUserData(id_userdata, bodyIn);
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
  async deleteUserData() {
    try {
      this.loadingData = true;
      this.confirm = true;
      //Delete user
      let response = await this.usersService.deleteUserData(this.delUserDataSel.id_userdata);
      let dataReturn = await response.json();
      this.loadingData = false;
      this.confirm = false;
      this.onReset();
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

  open(content: any, userData: any) {
    userData.birthdate_userdata = this.fechaCorta(userData.birthdate_userdata);
    userData.age_userdata = this.toEdad(userData.age_userdata);
    this.delUserDataSel = Object.assign({}, userData);
    this.modalService.open(content, { centered: true });
  }

  fechaCorta(fechaIn: any): any {
    return fechaIn.substr(0, 10);
  }

  toEdad(jsonIn: any): any {
    let str: any = JSON.stringify(jsonIn)
    const mapObj: any = {
      years: "Años",
      months: "Meses",
      days: "Dias"
    };
    //{"Año(s)":46,"Mes(es)":7,"Dia(as)":12}
    str = str.replace(/[{",}]/g, ' ');
    str = str.replace(/\b(?:years|months|days)\b/gi, (matched: any) => mapObj[matched]);
    str = str.replace(/[:]/g, ': ');
    return str.trim();
  }

  toDataHead(jsonIn: any): any {
    this.dataHead = `${jsonIn.name_user}, ${jsonIn.email_user}`;
  }
}
