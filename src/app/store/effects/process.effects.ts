import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Actions, Effect, ofType} from '@ngrx/effects';

import * as processActions from '../actions/process.action';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ProcessService} from '../../services/process.service';
import {ProcessInterface} from '../../interfaces/process.interface';


@Injectable()
export class ProcessEffects {
  constructor(
    private actions$: Actions,
    private processService: ProcessService
  ) {}

  @Effect()
  loadProcesses$: Observable<Action> = this.actions$.pipe(
    ofType<processActions.LoadProcesses>(
      processActions.ProcessActionType.LOAD_PROCESSES
    ),
    mergeMap((action: processActions.LoadProcesses) =>
      this.processService.getProcess().pipe(
        map(
          (processes: ProcessInterface[]) =>
            new processActions.LoadProcessesSuccess(processes)
        ),
        catchError(error => of(new processActions.LoadProcessesFail(error)))
      )
    )
  );
  @Effect()
  loadProcess$: Observable<Action> = this.actions$.pipe(
    ofType<processActions.LoadProcess>(
      processActions.ProcessActionType.LOAD_PROCESS
    ),
    mergeMap((action: processActions.LoadProcess) =>
      this.processService.getProcessById(action.payload).pipe(
        map(
          (process: ProcessInterface) =>
            new processActions.LoadProcessSuccess(process)
        ),
        catchError(error => of(new processActions.LoadProcessFail(error)))
      )
    )
  );
  @Effect()
  createProcess$: Observable<Action> = this.actions$.pipe(
    ofType<processActions.CreateProcess>(
      processActions.ProcessActionType.CREATE_PROCESS
    ),
    map((action: processActions.CreateProcess) => action.payload),
    mergeMap((process: ProcessInterface) =>
      this.processService.createProcess(process).pipe(
        map(
          (newProcess: ProcessInterface) =>
            new processActions.CreateProcessSuccess(newProcess)
        ),
        catchError(err => of(new processActions.CreateProcessFail(err)))
      )
    )
  );

  @Effect()
  updateProcess$: Observable<Action> = this.actions$.pipe(
    ofType<processActions.UpdateProcess>(
      processActions.ProcessActionType.UPDATE_PROCESS
    ),
    map((action: processActions.UpdateProcess) => action.payload),
    mergeMap((process: ProcessInterface) =>
      this.processService.updateProcess(process).pipe(
        map(
          (updateProcess: ProcessInterface) =>
            new processActions.UpdateProcessSuccess({
              id: updateProcess.id,
              changes: updateProcess
            })
        ),
        catchError(err => of(new processActions.UpdateProcessFail(err)))
      )
    )
  );

  @Effect()
  deleteProcess$: Observable<Action> = this.actions$.pipe(
    ofType<processActions.DeleteProcess>(
      processActions.ProcessActionType.DELETE_PROCESS
    ),
    map((action: processActions.DeleteProcess) => action.payload),
    mergeMap((id: any) =>
      this.processService.deleteProcess(id).pipe(
        map(
          () => new processActions.DeleteProcessSuccess(id)
        ),
        catchError(error => of(new processActions.DeleteProcessFail(error)))
      )
    )
  );
}
