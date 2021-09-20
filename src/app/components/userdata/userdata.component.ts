import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { userDataModel } from '../../models/userdata.model';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  // Variable para datos del usuario
  public UserData: any;
  //
  userDataForm!: FormGroup;
  loading = false;
  loadingData = false
  submitted = false;

  constructor(public usersService: UsersService, private router: Router, private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    // Llamado de función que retorna datols del usuario. 
    this.UserData = this.usersService.getInfoUserData();
    console.log('UserData', this.UserData);
  }

  ngOnInit(): void {
    this.userDataForm = this.formBuilder.group({
      id_userdata: [null],
      id_user_userdata: [null],
      address_userdata: [{ value: '', disabled: false }, [Validators.required]],
      phone_userdata: [{ value: '', disabled: false }, [Validators.required]],
      birthdate_userdata: [{ value: '', disabled: false }, [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userDataForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.loadingData = true;
    //
    // stop here if form is invalid
    if (this.userDataForm.invalid) {
      return;
    }
    //save user
    console.log('this.userDataForm:', this.userDataForm.value)

  }

  onReset() {
    this.submitted = false;
    this.loading = false;
    this.loadingData = false;
    this.usersService.selectUserData = new userDataModel();
    this.userDataForm.reset();
  }

  editUserData(userData: any) {
    userData.birthdate_userdata = this.fechaCorta(userData.birthdate_userdata);
    console.log('userData: ', userData);
    this.usersService.selectUserData = Object.assign({}, userData);
  }

  fechaCorta(fechaIn: any): any {
    console.log('fechaIn: ', fechaIn.substr(0, 10))
    return fechaIn.substr(0, 10);
  }
  
  toEdad(jsonIn: any): any {
    let str: any = JSON.stringify(jsonIn)
    const mapObj: any = {
      years: "Años",
      months: "Meses",
      days: "Diaas"

    };
    //{"Año(s)":46,"Mes(es)":7,"Dia(as)":12}
    str = str.replace(/\b(?:years|months|days)\b/gi, (matched: any) => mapObj[matched]);
    str = str.replace(/[{",}]/g,' ');
    console.log(str.trim());
    return str.trim();
  }
}
