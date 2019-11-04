import {UserInterface} from '../../interfaces/user.interface';
import * as fromRoot from '../../store/state/app.state';
import * as UserActions from '../actions/user.action';

export interface UserState {
  users: UserInterface[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  users: UserState;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  loaded: false,
  error: ''
};

export function userReducer(state = initialState, action: UserActions.Action): UserState {
  switch (action.type) {
    case UserActions.UserActionType.LOAD_USERS:{
      return {
        ...state,
        loading: true
      };
    }
    case UserActions.UserActionType.LOAD_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload
      };
    }
    case UserActions.UserActionType.LOAD_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
