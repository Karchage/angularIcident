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
  );
  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUser>(
      userActions.UserActionType.LOAD_USER
    ),
    mergeMap((action: userActions.LoadUser) =>
      this.userService.getUserById(action.payload).pipe(
        map(
          (user: UserInterface) =>
            new userActions.LoadUserSuccess(user)
        ),
        catchError(err => of(new userActions.LoadUserFail(err)))
      )
    )
  );
  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.CreateUser>(
      userActions.UserActionType.CREATE_USER
    ),
    map((action: userActions.CreateUser) => action.payload),
    mergeMap((user: UserInterface) =>
      this.userService.createUser(user).pipe(
        map(
          (newUser: UserInterface) =>
            new userActions.CreateUserSuccess(newUser)
        ),
        catchError(err => of(new userActions.CreateUserFail(err)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UpdateUser>(
      userActions.UserActionType.UPDATE_USER
    ),
    map((action: userActions.UpdateUser) => action.payload),
    mergeMap((user: UserInterface) =>
      this.userService.updateUser(user).pipe(
        map(
          (updateUser: UserInterface) =>
            new userActions.UpdateUserSuccess({
              id: updateUser.id,
              changes: updateUser
            })
        ),
        catchError(err => of(new userActions.UpdateUserFail(err)))
      )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.DeleteUser>(
      userActions.UserActionType.DELETE_USER
    ),
    map((action: userActions.DeleteUser) => action.payload),
    mergeMap((id: any) =>
      this.userService.deleteUser(id).pipe(
        map(
          () => new userActions.DeleteUserSuccess(id)
        ),
        catchError(err => of(new userActions.DeleteUserFail(err)))
      )
    )
  );
}
