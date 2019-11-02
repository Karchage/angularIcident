import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { ProcessComponent } from './components/process/process.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import {FormsModule} from '@angular/forms';
import { NewIncidentsComponent } from './components/incidents/new-incidents/new-incidents.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    IncidentsComponent,
    ProcessComponent,
    AuthPageComponent,
    NewIncidentsComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
