import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {UserService} from '../../services/user.service';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as userActions from '../actions/user.action';
import { UserInterface} from '../../interfaces/user.interface';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUsers>(
      userActions.UserActionType.LOAD_USERS
    ),
    mergeMap((actions: userActions.LoadUsers) =>
      this.userService.getUsers().pipe(
        map(
          (users: UserInterface[]) =>
            new userActions.LoadUsersSuccess(users)
        ),
        catchError(err => of(new userActions.LoadUsersFail(err)))
      )
    )
  )
}
