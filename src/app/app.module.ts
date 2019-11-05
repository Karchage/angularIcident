import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { ProcessComponent } from './components/process/process.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewIncidentsComponent } from './components/incidents/new-incidents/new-incidents.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';





@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    ProcessComponent,
    AuthPageComponent,
    NewIncidentsComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
