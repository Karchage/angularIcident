import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';


const routes: Routes = [
  {path: 'incidents', loadChildren: '../app/components/incidents/incidents.module#IncidentsModule'},
  {path: 'process', loadChildren: '../app/components/process/process.module#ProcessModule'},
  {path: 'users', loadChildren: '../app/components/users/users.module#UsersModule'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'register', component: RegisterPageComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
