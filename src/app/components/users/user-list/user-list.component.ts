import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as userActions from '../../../store/actions/user.action';
import * as fromUser from '../../../store/reducers/user.reducer';
import {UserInterface} from '../../../interfaces/user.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users$: Observable<UserInterface[]>;
  constructor(private store: Store<fromUser.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
  }

  editUser(user: UserInterface) {
    console.log('editUser');
    console.log(user);
    this.store.dispatch(new userActions.LoadUser(user.id));
  }
  deleteUser(user: UserInterface) {
    if (confirm('Sure ?')) {
      this.store.dispatch(new userActions.DeleteUser(user.id));

    }
  }
}
