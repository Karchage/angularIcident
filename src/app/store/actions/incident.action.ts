import {Action} from '@ngrx/store';
import {IncidentInterface} from '../../interfaces/incident.interface';
import {Update} from '@ngrx/entity';


export enum IncidentActionType {
  LOAD_INCIDENTS= '[Incident] Load Incidents',
  LOAD_INCIDENTS_SUCCESS = '[Incident] Load Incidents Success',
  LOAD_INCIDENTS_FAIL = '[Incident] Load Incidents Fail',
  LOAD_INCIDENT= '[Incident] Load Incident',
  LOAD_INCIDENT_SUCCESS = '[Incident] Load Incident Success',
  LOAD_INCIDENT_FAIL = '[Incident] Load Incident Fail',
  CREATE_INCIDENT= '[Incident] Create Incident',
  CREATE_INCIDENT_SUCCESS = '[Incident] Create Incident Success',
  CREATE_INCIDENT_FAIL = '[Incident] Create Incident Fail',
  UPDATE_INCIDENT= '[Incident] Update Incident',
  UPDATE_INCIDENT_SUCCESS = '[Incident] Update Incident Success',
  UPDATE_INCIDENT_FAIL = '[Incident] Update Incident Fail',
  DELETE_INCIDENT= '[Incident] Delete Incident',
  DELETE_INCIDENT_SUCCESS = '[Incident] Delete Incident Success',
  DELETE_INCIDENT_FAIL = '[Incident] Delete Incident Fail',
}
export class LoadIncidents implements Action {
  readonly type = IncidentActionType.LOAD_INCIDENTS;
}
export class LoadIncidentsSuccess implements Action {
  readonly type = IncidentActionType.LOAD_INCIDENTS_SUCCESS;
  constructor(public payload: IncidentInterface[]) {}
}
export class LoadIncidentsFail implements Action {
  readonly type = IncidentActionType.LOAD_INCIDENTS_FAIL;
  constructor(public payload: string) {}
}

export class LoadIncident implements Action {
  readonly type = IncidentActionType.LOAD_INCIDENT;
  constructor(public payload: string) {}
}
export class LoadIncidentSuccess implements Action {
  readonly type = IncidentActionType.LOAD_INCIDENT_SUCCESS;
  constructor(public payload: IncidentInterface) {}
}
export class LoadIncidentFail implements Action {
  readonly type = IncidentActionType.LOAD_INCIDENT_FAIL;
  constructor(public payload: string) {}
}

export class CreateIncident implements Action {
  readonly type = IncidentActionType.CREATE_INCIDENT;
  constructor(public payload: IncidentInterface) {}
}
export class CreateIncidentSuccess implements Action {
  readonly type = IncidentActionType.CREATE_INCIDENT_SUCCESS;
  constructor(public payload: IncidentInterface) {}
}
export class CreateIncidentFail implements Action {
  readonly type = IncidentActionType.CREATE_INCIDENT_FAIL;
  constructor(public payload: string) {}
}

export class UpdateIncident implements Action {
  readonly type = IncidentActionType.UPDATE_INCIDENT;
  constructor(public payload: IncidentInterface) {}
}
export class UpdateIncidentSuccess implements Action {
  readonly type = IncidentActionType.UPDATE_INCIDENT_SUCCESS;
  constructor(public payload: Update<IncidentInterface>) {}
}
export class UpdateIncidentFail implements Action {
  readonly type = IncidentActionType.UPDATE_INCIDENT_FAIL;
  constructor(public payload: string) {}
}

export class DeleteIncident implements Action {
  readonly type = IncidentActionType.DELETE_INCIDENT;
  constructor(public payload: string) {}
}
export class DeleteIncidentSuccess implements Action {
  readonly type = IncidentActionType.DELETE_INCIDENT_SUCCESS;
  constructor(public payload: string) {}
}
export class DeleteIncidentFail implements Action {
  readonly type = IncidentActionType.DELETE_INCIDENT_FAIL;
  constructor(public payload: string) {}
}

export type Action =
  LoadIncidents | LoadIncidentsSuccess | LoadIncidentsFail |
  LoadIncident | LoadIncidentSuccess | LoadIncidentFail |
  CreateIncident | CreateIncidentSuccess | CreateIncidentFail |
  UpdateIncident| UpdateIncidentSuccess | UpdateIncidentFail |
  DeleteIncident | DeleteIncidentSuccess | DeleteIncidentFail ;
