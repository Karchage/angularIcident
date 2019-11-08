import {Action} from '@ngrx/store';

import {Update} from '@ngrx/entity';
import {ProcessInterface} from '../../interfaces/process.interface';


export enum ProcessActionType {
  LOAD_PROCESSES= '[Process] Load Processes',
  LOAD_PROCESSES_SUCCESS = '[Process] Load Processes Success',
  LOAD_PROCESSES_FAIL = '[Process] Load Processes Fail',
  LOAD_PROCESS= '[Process] Load Process',
  LOAD_PROCESS_SUCCESS = '[Process] Load Process Success',
  LOAD_PROCESS_FAIL = '[Process] Load Process Fail',
  CREATE_PROCESS= '[Process] Create Process',
  CREATE_PROCESS_SUCCESS = '[Process] Create Process Success',
  CREATE_PROCESS_FAIL = '[Process] Create Process Fail',
  UPDATE_PROCESS= '[Process] Update Process',
  UPDATE_PROCESS_SUCCESS = '[Process] Update Process Success',
  UPDATE_PROCESS_FAIL = '[Process] Update Process Fail',
  DELETE_PROCESS= '[Process] Delete Process',
  DELETE_PROCESS_SUCCESS = '[Process] Delete Process Success',
  DELETE_PROCESS_FAIL = '[Process] Delete Process Fail',
}
export class LoadProcesses implements Action {
  readonly type = ProcessActionType.LOAD_PROCESSES;
}
export class LoadProcessesSuccess implements Action {
  readonly type = ProcessActionType.LOAD_PROCESSES_SUCCESS;
  constructor(public payload: ProcessInterface[]) {}
}
export class LoadProcessesFail implements Action {
  readonly type = ProcessActionType.LOAD_PROCESSES_FAIL;
  constructor(public payload: string) {}
}

export class LoadProcess implements Action {
  readonly type = ProcessActionType.LOAD_PROCESS;
  constructor(public payload: string) {}
}
export class LoadProcessSuccess implements Action {
  readonly type = ProcessActionType.LOAD_PROCESS_SUCCESS;
  constructor(public payload: ProcessInterface) {}
}
export class LoadProcessFail implements Action {
  readonly type = ProcessActionType.LOAD_PROCESS_FAIL;
  constructor(public payload: string) {}
}

export class CreateProcess implements Action {
  readonly type = ProcessActionType.CREATE_PROCESS;
  constructor(public payload: ProcessInterface) {}
}
export class CreateProcessSuccess implements Action {
  readonly type = ProcessActionType.CREATE_PROCESS_SUCCESS;
  constructor(public payload: ProcessInterface) {}
}
export class CreateProcessFail implements Action {
  readonly type = ProcessActionType.CREATE_PROCESS_FAIL;
  constructor(public payload: string) {}
}

export class UpdateProcess implements Action {
  readonly type = ProcessActionType.UPDATE_PROCESS;
  constructor(public payload: ProcessInterface) {}
}
export class UpdateProcessSuccess implements Action {
  readonly type = ProcessActionType.UPDATE_PROCESS_SUCCESS;
  constructor(public payload: Update<ProcessInterface>) {}
}
export class UpdateProcessFail implements Action {
  readonly type = ProcessActionType.UPDATE_PROCESS_FAIL;
  constructor(public payload: string) {}
}

export class DeleteProcess implements Action {
  readonly type = ProcessActionType.DELETE_PROCESS;
  constructor(public payload: string) {}
}
export class DeleteProcessSuccess implements Action {
  readonly type = ProcessActionType.DELETE_PROCESS_SUCCESS;
  constructor(public payload: string) {}
}
export class DeleteProcessFail implements Action {
  readonly type = ProcessActionType.DELETE_PROCESS_FAIL;
  constructor(public payload: string) {}
}

export type Action =
  LoadProcesses | LoadProcessesSuccess | LoadProcessesFail |
  LoadProcess | LoadProcessSuccess | LoadProcessFail |
  CreateProcess | CreateProcessSuccess | CreateProcessFail |
  UpdateProcess| UpdateProcessSuccess | UpdateProcessFail |
  DeleteProcess | DeleteProcessSuccess | DeleteProcessFail ;
