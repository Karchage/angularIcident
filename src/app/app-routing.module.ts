import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegisterPageComponent} from './components/register-page/register-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/incidents', pathMatch: 'full'},
  {path: 'incidents', loadChildren: '../app/components/incidents/incidents.module#IncidentsModule'},
  {path: 'process', loadChildren: '../app/components/process/process.module#ProcessModule'},
  {path: 'users', loadChildren: '../app/components/users/users.module#UsersModule'},
  {path: 'register', component: RegisterPageComponent},
  {path: '**', redirectTo: '/incidents'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
