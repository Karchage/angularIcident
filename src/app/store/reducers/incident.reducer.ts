import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as IncidentActions from '../actions/incident.action';
import {IncidentInterface} from '../../interfaces/incident.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';



export interface IncidentState extends EntityState<IncidentInterface> {
  selectedIncidentId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const incidentAdapter: EntityAdapter<IncidentInterface> = createEntityAdapter<IncidentInterface>();

export const defaultIncident: IncidentState = {
  ids: [],
  entities: {},
  selectedIncidentId: null,
  loading: false,
  loaded: false,
  error: ''
};
export const  initialState = incidentAdapter.getInitialState(defaultIncident);

export function incidentReducer(state = initialState, action: IncidentActions.Action): IncidentState {
  switch (action.type) {
    case IncidentActions.IncidentActionType.LOAD_INCIDENTS_SUCCESS: {
      return incidentAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case IncidentActions.IncidentActionType.LOAD_INCIDENTS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case IncidentActions.IncidentActionType.LOAD_INCIDENT_SUCCESS: {
      console.log('PAYLOAD IN LOAD INCIDENT', action.payload);
      return incidentAdapter.addOne(action.payload, {
        ...state,
        selectedIncidentId: action.payload.id
      });
    }
    case IncidentActions.IncidentActionType.LOAD_INCIDENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case IncidentActions.IncidentActionType.CREATE_INCIDENT_SUCCESS: {
      return incidentAdapter.addOne(action.payload, state);
    }
    case IncidentActions.IncidentActionType.CREATE_INCIDENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case IncidentActions.IncidentActionType.UPDATE_INCIDENT_SUCCESS: {
      return incidentAdapter.updateOne(action.payload, state);
    }
    case IncidentActions.IncidentActionType.UPDATE_INCIDENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case IncidentActions.IncidentActionType.DELETE_INCIDENT_SUCCESS: {
      return incidentAdapter.removeOne(action.payload, state);
    }
    case IncidentActions.IncidentActionType.DELETE_INCIDENT_FAIL: {
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
const getIncidentFeatureState = createFeatureSelector<IncidentState>(
  'incidents'
);

export const getIncidents = createSelector(
  getIncidentFeatureState,
  incidentAdapter.getSelectors().selectAll
);
export const getIncidentsLoading = createSelector(
  getIncidentFeatureState,
  (state: IncidentState) => state.loading
);
export const getIncidentsLoaded = createSelector(
  getIncidentFeatureState,
  (state: IncidentState) => state.loaded
);
export const getIncidentsError = createSelector(
  getIncidentFeatureState,
  (state: IncidentState) => state.error
);
export const getCurrentIncidentId = createSelector(
  getIncidentFeatureState,
  (state: IncidentState) => state.selectedIncidentId
);
export const getCurrentIncident = createSelector(
  getIncidentFeatureState,
  getCurrentIncidentId,
  state => state.entities[state.selectedIncidentId]
);
