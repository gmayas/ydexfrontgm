import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  // Variable para datos del usuario
  public infoUserData: any; 

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    // Llamado de función que retorna datols del usuario. 
   this.infoUserData = this.usersService.getInfoUserData();
  }

}
