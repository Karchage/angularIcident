import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as usersActions from '../../../store/actions/user.action';
import * as fromUser from '../../../store/reducers/user.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserInterface} from '../../../interfaces/user.interface';
import {getCurrentUser} from '../../../store/reducers/user.reducer';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

  edit: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromUser.AppState>
  ) { }
  curentUserLog: UserInterface;
  ngOnInit() {
    this.edit = this.fb.group({
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      position: ['', Validators.required]
    });
    const users$: Observable<UserInterface> = this.store.select(
      fromUser.getCurrentUser
    );

    users$.subscribe(currentUser => {
      if (currentUser) {
        this.curentUserLog = currentUser;
        this.edit.patchValue({
          name: currentUser.name,
          DOB: currentUser.DOB,
          position: currentUser.position,
        });
      }
    });
  }
  updateUser() {
    const updatedUser: UserInterface = {
      DOB: this.curentUserLog.DOB,
      name: this.edit.get('name').value,
      position: this.edit.get('position').value,
      id: this.curentUserLog.id
    };
    this.store.dispatch(new usersActions.UpdateUser(updatedUser));
  }


}
