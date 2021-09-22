import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserdataComponent } from './components/userdata/userdata.component';
import { AboutComponent } from './components/about/about.component';
import { Algoritmo01Component } from './components/algoritmo01/algoritmo01.component';
import { Algoritmo02Component } from './components/algoritmo02/algoritmo02.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'alg01', component: Algoritmo01Component  },
  { path: 'alg02', component: Algoritmo02Component  },
  { path: 'users', component: UsersComponent  },
  { path: 'userdata', component: UserdataComponent  },
  { path: 'about', component: AboutComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
