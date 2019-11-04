import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as userActions from '../../../store/actions/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
users;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers());
    this.store.subscribe(state => (this.users = state.users.users));
  }

}
