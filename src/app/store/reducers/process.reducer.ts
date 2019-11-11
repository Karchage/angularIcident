import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as ProcessActions from '../actions/process.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessInterface} from '../../interfaces/process.interface';



export interface ProcessState extends EntityState<ProcessInterface> {
  selectedProcessId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const processAdapter: EntityAdapter<ProcessInterface> = createEntityAdapter<ProcessInterface>();

export const defaultProcess: ProcessState = {
  ids: [],
  entities: {},
  selectedProcessId: null,
  loading: false,
  loaded: false,
  error: ''
};
export const  initialState = processAdapter.getInitialState(defaultProcess);

export function processReducer(state = initialState, action: ProcessActions.Action): ProcessState {
  switch (action.type) {
    case ProcessActions.ProcessActionType.LOAD_PROCESSES_SUCCESS: {
      return processAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case ProcessActions.ProcessActionType.LOAD_PROCESSES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case ProcessActions.ProcessActionType.LOAD_PROCESS_SUCCESS: {
      return processAdapter.addOne(action.payload, {
        ...state,
        selectedProcessId: action.payload.id
      });
    }
    case ProcessActions.ProcessActionType.LOAD_PROCESS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ProcessActions.ProcessActionType.CREATE_PROCESS_SUCCESS: {
      return processAdapter.addOne(action.payload, state);
    }
    case ProcessActions.ProcessActionType.CREATE_PROCESS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ProcessActions.ProcessActionType.UPDATE_PROCESS_SUCCESS: {
      return processAdapter.updateOne(action.payload, state);
    }
    case ProcessActions.ProcessActionType.UPDATE_PROCESS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ProcessActions.ProcessActionType.DELETE_PROCESS_SUCCESS: {
      return processAdapter.removeOne(action.payload, state);
    }
    case ProcessActions.ProcessActionType.DELETE_PROCESS_FAIL: {
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
const getProcessFeatureState = createFeatureSelector<ProcessState>(
  'processes'
);

export const getProcesses = createSelector(
  getProcessFeatureState,
  processAdapter.getSelectors().selectAll
);
export const getProcessesLoadding = createSelector(
  getProcessFeatureState,
  (state: ProcessState) => state.loading
);
export const getProcessesLoaded = createSelector(
  getProcessFeatureState,
  (state: ProcessState) => state.loaded
);
export const getProcessesError = createSelector(
  getProcessFeatureState,
  (state: ProcessState) => state.error
);
export const getCurrentProcessId = createSelector(
  getProcessFeatureState,
  (state: ProcessState) => state.selectedProcessId
);
export const getCurrentProcess = createSelector(
  getProcessFeatureState,
  getCurrentProcessId,
  state => state.entities[state.selectedProcessId]
);
