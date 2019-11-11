import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessAddComponent } from './process-add/process-add.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ProcessCurrentComponent } from './process-current/process-current.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '../../store/effects/user.effects';
import {StoreModule} from '@ngrx/store';
import {userReducer} from '../../store/reducers/user.reducer';

import {processReducer} from '../../store/reducers/process.reducer';
import {ProcessEffects} from '../../store/effects/process.effects';


const processRoutes: Routes = [{path: '', component: ProcessCurrentComponent}];
@NgModule({
  declarations: [ProcessAddComponent, ProcessListComponent, ProcessEditComponent, ProcessCurrentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(processRoutes),
    EffectsModule.forFeature([UserEffects, ProcessEffects]),
    StoreModule.forFeature('processes', processReducer),
    StoreModule.forFeature('users', userReducer),
    ReactiveFormsModule
  ]
})
export class ProcessModule { }
