import {Action} from '@ngrx/store';
import {UserInterface} from '../../interfaces/user.interface';

export enum UserActionType {
  LOAD_USERS= '[USER] Load Users',
  LOAD_USER_SUCCESS = '[USER] Load Users Success',
  LOAD_USER_FAIL = '[USER] Load Users Fail',
}

export class LoadUsers implements Action {
  readonly type = UserActionType.LOAD_USERS;
}
export class LoadUsersSuccess implements Action {
  readonly type = UserActionType.LOAD_USER_SUCCESS;
  constructor(public payload: UserInterface[]) {}
}
export class LoadUsersFail implements Action {
  readonly type = UserActionType.LOAD_USER_FAIL;
  constructor(public payload: string) {}
}

export type Action = LoadUsers | LoadUsersSuccess | LoadUsersFail;
