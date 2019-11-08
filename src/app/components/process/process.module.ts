import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessAddComponent } from './process-add/process-add.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ProcessCurrentComponent } from './process-current/process-current.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


const processRoutes: Routes = [{path: '', component: ProcessCurrentComponent}];
@NgModule({
  declarations: [ProcessAddComponent, ProcessListComponent, ProcessEditComponent, ProcessCurrentComponent],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(processRoutes),
    ReactiveFormsModule
  ]
})
export class ProcessModule { }
