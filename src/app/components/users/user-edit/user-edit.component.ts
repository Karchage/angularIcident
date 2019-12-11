import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as usersActions from '../../../store/actions/user.action';
import * as fromUser from '../../../store/reducers/user.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserInterface} from '../../../interfaces/user.interface';
import {AppState} from '../../../store/state/app.state';
import {CustomValidators} from '../../../customValidators';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

  edit: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }
  currentUserLog: UserInterface;
  ngOnInit() {
    this.edit = this.fb.group({
      DOB: ['', Validators.required],
      id: ['', Validators.required],
      position: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, CustomValidators.checkNumberInName])]
    });
    const users$: Observable<UserInterface> = this.store.select(
      fromUser.getCurrentUser
    );

    users$.subscribe(currentUser => {
      if (currentUser) {
        this.currentUserLog = currentUser;
        this.edit.patchValue({
          name: currentUser.name,
          DOB: currentUser.DOB,
          id: currentUser.id,
          position: currentUser.position,
        });
      }
    });
  }
  updateUser() {
    const updatedUser: UserInterface = {
      DOB: this.currentUserLog.DOB,
      name: this.edit.get('name').value,
      position: this.edit.get('position').value,
      id: this.currentUserLog.id
    };
    this.store.dispatch(new usersActions.UpdateUser(updatedUser));
  }


}
