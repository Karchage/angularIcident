import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentComponent } from './incident/incident.component';
import { IncidentAddComponent } from './incident-add/incident-add.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IncidentEffects} from '../../store/effects/incident.effects';
import {incidentReducer} from '../../store/reducers/incident.reducer';
import {userReducer} from '../../store/reducers/user.reducer';
import {UserEffects} from '../../store/effects/user.effects';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import {processReducer} from '../../store/reducers/process.reducer';
import {ProcessEffects} from '../../store/effects/process.effects';
import {SearchIncidentPipe} from '../../pipes/search-incident.pipe';




const incidentsRoutes: Routes = [{path: '', component: IncidentComponent}, { path: ':id', component: IncidentDetailComponent }];
@NgModule({
  declarations: [IncidentComponent,
    IncidentAddComponent,
    IncidentListComponent,
    IncidentDetailComponent,
    SearchIncidentPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(incidentsRoutes),
    EffectsModule.forFeature([IncidentEffects, UserEffects, ProcessEffects]),
    StoreModule.forFeature('incidents', incidentReducer),
    StoreModule.forFeature('processes', processReducer),
    StoreModule.forFeature('users', userReducer),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class IncidentsModule { }
