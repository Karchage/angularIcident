import * as UserActions from '../actions/user.actions';
import {User} from '../../interfaces/user.interface';
import {Action} from '@ngrx/store';



export type userAction = UserActions.UserAction;

const defUser = new User(null, null, null, null, null, null);

export function UserReducer(state: User = defUser, action: userAction) {
  switch (action.type) {
    case UserActions.GET_USER:
        return{loading: true, ...state};
    case UserActions.AUTHENTICATED:
      return{...state, ...action.payload, loading: false};
    case UserActions.NOT_AUTHENTICATED:
      return{...state, ...defUser};
    case UserActions.FB_LOGIN:
      return{...state, loading: true};
    case UserActions.FB_LOGOUT:
      return{...state, loading: true};
    case UserActions.AUTH_ERROR:
      return{...state, ...action.payload, loading: false};
  }
}

