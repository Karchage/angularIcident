import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as userActions from '../../../store/actions/user.action';
import * as fromUser from '../../../store/reducers/user.reducer';
import {UserInterface} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.less']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromUser.AppState>
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      position: ['', Validators.required],
    });
  }
  createUser() {
    const newUser: UserInterface = {
      name: this.userForm.get('name').value,
      DOB: this.userForm.get('DOB').value,
      position: this.userForm.get('position').value,
    };
    // tslint:disable-next-line:no-unused-expression
    console.log(newUser);
    this.store.dispatch(new userActions.CreateUser(newUser));
    this.userForm.reset();
  }


}
