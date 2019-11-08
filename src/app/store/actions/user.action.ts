import {Action} from '@ngrx/store';
import {UserInterface} from '../../interfaces/user.interface';
import {Update} from '@ngrx/entity';

export enum UserActionType {
  LOAD_USERS= '[USER] Load Users',
  LOAD_USERS_SUCCESS = '[USER] Load Users Success',
  LOAD_USERS_FAIL = '[USER] Load Users Fail',
  LOAD_USER= '[USER] Load User',
  LOAD_USER_SUCCESS = '[USER] Load User Success',
  LOAD_USER_FAIL = '[USER] Load User Fail',
  CREATE_USER= '[USER] Create User',
  CREATE_USER_SUCCESS = '[USER] Create User Success',
  CREATE_USER_FAIL = '[USER] Create User Fail',
  UPDATE_USER= '[USER] Update User',
  UPDATE_USER_SUCCESS = '[USER] Update User Success',
  UPDATE_USER_FAIL = '[USER] Update User Fail',
  DELETE_USER= '[USER] Delete User',
  DELETE_USER_SUCCESS = '[USER] Delete User Success',
  DELETE_USER_FAIL = '[USER] Delete User Fail',
}

export class LoadUsers implements Action {
  readonly type = UserActionType.LOAD_USERS;
}
export class LoadUsersSuccess implements Action {
  readonly type = UserActionType.LOAD_USERS_SUCCESS;
  constructor(public payload: UserInterface[]) {}
}
export class LoadUsersFail implements Action {
  readonly type = UserActionType.LOAD_USERS_FAIL;
  constructor(public payload: string) {}
}

export class LoadUser implements Action {
  readonly type = UserActionType.LOAD_USER;
  constructor(public payload: string) {}
}
export class LoadUserSuccess implements Action {
  readonly type = UserActionType.LOAD_USER_SUCCESS;
  constructor(public payload: UserInterface) {}
}
export class LoadUserFail implements Action {
  readonly type = UserActionType.LOAD_USER_FAIL;
  constructor(public payload: string) {}
}

export class CreateUser implements Action {
  readonly type = UserActionType.CREATE_USER;
  constructor(public payload: UserInterface) {}
}
export class CreateUserSuccess implements Action {
  readonly type = UserActionType.CREATE_USER_SUCCESS;
  constructor(public payload: UserInterface) {}
}
export class CreateUserFail implements Action {
  readonly type = UserActionType.CREATE_USER_FAIL;
  constructor(public payload: string) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionType.UPDATE_USER;
  constructor(public payload: UserInterface) {}
}
export class UpdateUserSuccess implements Action {
  readonly type = UserActionType.UPDATE_USER_SUCCESS;
  constructor(public payload: Update<UserInterface>) {}
}
export class UpdateUserFail implements Action {
  readonly type = UserActionType.UPDATE_USER_FAIL;
  constructor(public payload: string) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionType.DELETE_USER;
  constructor(public payload: string) {}
}
export class DeleteUserSuccess implements Action {
  readonly type = UserActionType.DELETE_USER_SUCCESS;
  constructor(public payload: string) {}
}
export class DeleteUserFail implements Action {
  readonly type = UserActionType.DELETE_USER_FAIL;
  constructor(public payload: string) {}
}

export type Action =
  LoadUsers | LoadUsersSuccess | LoadUsersFail |
  LoadUser | LoadUserSuccess | LoadUserFail |
  CreateUser | CreateUserSuccess | CreateUserFail |
  UpdateUser | UpdateUserSuccess | UpdateUserFail |
  DeleteUser | DeleteUserSuccess | DeleteUserFail ;
