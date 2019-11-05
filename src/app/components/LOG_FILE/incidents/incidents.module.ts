import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentComponent } from './incident/incident.component';
import { IncidentEditComponent } from './incident-edit/incident-edit.component';
import { IncidentAddComponent } from './incident-add/incident-add.component';
import { IncidentListComponent } from './incident-list/incident-list.component';



@NgModule({
  declarations: [IncidentComponent, IncidentEditComponent, IncidentAddComponent, IncidentListComponent],
  imports: [
    CommonModule
  ]
})
export class IncidentsModule { }
