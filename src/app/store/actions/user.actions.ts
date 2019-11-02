import {Action} from '@ngrx/store';


export const GET_USER = '[Auth] Get user';
export const AUTHENTICATED = '[Auth] Auth';
export const NOT_AUTHENTICATED = '[Auth] Not Auth';
export const FB_LOGIN = '[Auth] Fb login';
export const FB_LOGOUT = '[Auth] Fb logout';
export const AUTH_ERROR = '[Auth] Auth error';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class FbLogin implements Action {
  readonly type = FB_LOGIN;
  constructor(public payload?: any) {}
}

export class FbLogout implements Action {
  readonly type = FB_LOGOUT;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}
export type UserAction = GetUser | Authenticated | NotAuthenticated | FbLogin | FbLogout | AuthError;
