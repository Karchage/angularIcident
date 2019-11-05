import {UserInterface} from '../../interfaces/user.interface';
import * as fromRoot from '../../store/state/app.state';
import * as UserActions from '../actions/user.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface UserState extends EntityState<UserInterface> {
  selectedUserId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  users: UserState;
}

export const userAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();

export const defaultUser: UserState = {
  ids: [],
  entities: {},
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const  initialState = userAdapter.getInitialState(defaultUser);


export function userReducer(state = initialState, action: UserActions.Action): UserState {
  switch (action.type) {
    case UserActions.UserActionType.LOAD_USERS_SUCCESS: {
      return userAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case UserActions.UserActionType.LOAD_USERS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case UserActions.UserActionType.LOAD_USER_SUCCESS: {
      console.log('PAYLOAD IN LOAD USER', action.payload);
      return userAdapter.addOne(action.payload, {
        ...state,
        selectedUserId: action.payload.id
      });
    }
    case UserActions.UserActionType.LOAD_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UserActions.UserActionType.CREATE_USER_SUCCESS: {
      return userAdapter.addOne(action.payload, state);
    }
    case UserActions.UserActionType.CREATE_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UserActions.UserActionType.UPDATE_USER_SUCCESS: {
      return userAdapter.updateOne(action.payload, state);
    }
    case UserActions.UserActionType.UPDATE_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UserActions.UserActionType.DELETE_USER_SUCCESS: {
      return userAdapter.removeOne(action.payload, state);
    }
    case UserActions.UserActionType.DELETE_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getUserFeatureState = createFeatureSelector<UserState>(
  'users'
);
export const getUsers = createSelector(
  getUserFeatureState,
  userAdapter.getSelectors().selectAll
);
export const getUsersLoading = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loading
);
export const getUsersLoaded = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loaded
);
export const getUsersError = createSelector(
  getUserFeatureState,
  (state: UserState) => state.error
);
export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state: UserState) => state.selectedUserId
);
export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  state => state.entities[state.selectedUserId]
);
