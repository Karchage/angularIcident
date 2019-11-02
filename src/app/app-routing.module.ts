import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IncidentsComponent} from './components/incidents/incidents.component';
import {ProcessComponent} from './components/process/process.component';
import {UsersComponent} from './components/users/users.component';
import {AuthPageComponent} from './components/auth-page/auth-page.component';


const routes: Routes = [
  {path: 'incidents', component: IncidentsComponent},
  {path: 'process', component: ProcessComponent},
  {path: 'users', component: UsersComponent},
  {path: 'auth', component: AuthPageComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
