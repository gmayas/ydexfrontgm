import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  /*
  { path: '', component:  HomeComponent },
  { path: 'alg01', component: Algoritmo01Component  },
  { path: 'alg02', component: Algoritmo02Component  },
  { path: 'users', component: UsersComponent  },
  { path: 'userdata', component: UserdataComponent  },
  { path: 'about', component: AboutComponent  },
   */
  // 
  goHome() {
      try {
        this.router.navigate(['']);
      } catch (e) {
        console.log('Error respose: ', e)
      }
  }
  //
  goAlg01() {
    try {
      this.router.navigate(['alg01']);
    } catch (e) {
      console.log('Error respose: ', e)
    }
  }

  //
  goAlg02() {
    try {
      this.router.navigate(['alg02']);
    } catch (e) {
      console.log('Error respose: ', e)
    }
  }

  // 
  goUsers() {
    try {
      this.router.navigate(['users']);
    } catch (e) {
      console.log('Error respose: ', e)
    }
  }

  //
  goAbout() {
    try {
      this.router.navigate(['about']);
    } catch (e) {
      console.log('Error respose: ', e)
    }
  }

}
