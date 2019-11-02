import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
users;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch({type: 'LOAD_USER'});
    this.store.subscribe(state => (this.users = state.users.users));
  }

}
