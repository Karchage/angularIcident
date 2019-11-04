import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {userReducer} from '../../store/reducers/user.reducer';
import { EffectsModule, Actions} from '@ngrx/effects';

import { UserEffects} from '../../store/effects/user.effects';


import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';




const userRoutes: Routes = [{path: '', component: UserComponent}];

@NgModule({
  declarations: [UserComponent, UserAddComponent, UserEditComponent, UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature('users', userReducer)
  ]
})
export class UsersModule { }
