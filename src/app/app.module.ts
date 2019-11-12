import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthPageComponent } from './components/auth-page/auth-page.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SearchIncidentPipe } from './pipes/search-incident.pipe';





@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    RegisterPageComponent,

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
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
