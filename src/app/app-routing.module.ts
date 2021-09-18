import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserdataComponent } from './components/userdata/userdata.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'users', component: UsersComponent  },
  { path: 'userdata', component: UserdataComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
