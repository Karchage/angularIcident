import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {UserAction} from '../actions/user.actions';

@Injectable()

export class UserEffect {
  constructor(
    // tslint:disable-next-line:variable-name
    private _action: Actions
  ) {}
  @Effect()
  getUser: Observable<Action> = this._action.pipe(
    ofType<UserAction>()
  );

  @Effect()
  loginUser: Observable<Action> = this._action.pipe(
    ofType<UserAction>()
  );

  @Effect()
  logoutUser: Observable<Action> = this._action.pipe(
    ofType<UserAction>()
  );
}

