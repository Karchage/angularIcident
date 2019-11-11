import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IncidentsService} from '../../services/incidents.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as incidentActions from '../actions/incident.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {IncidentInterface} from '../../interfaces/incident.interface';

@Injectable()
export class IncidentEffects {
  constructor(
    private actions$: Actions,
    private incidentService: IncidentsService
  ) {}

  @Effect()
  loadIncidents$: Observable<Action> = this.actions$.pipe(
    ofType<incidentActions.LoadIncidents>(
      incidentActions.IncidentActionType.LOAD_INCIDENTS
    ),
    mergeMap((action: incidentActions.LoadIncidents) =>
    this.incidentService.getIncidents().pipe(
      map((incidents: IncidentInterface[]) => new incidentActions.LoadIncidentsSuccess(incidents)),
      catchError(error => of(new incidentActions.LoadIncidentsFail(error)))
    )
  ));

  @Effect()
  createIncident$: Observable<Action> = this.actions$.pipe(
    ofType<incidentActions.CreateIncident>(
      incidentActions.IncidentActionType.CREATE_INCIDENT
    ),
    map((action: incidentActions.CreateIncident) => action.payload),
    mergeMap((incident: IncidentInterface) =>
      this.incidentService.createIncident(incident).pipe(
        map(
          (newIncident: IncidentInterface) =>
            new incidentActions.CreateIncidentSuccess(newIncident)
        ),
        catchError(error => of(new incidentActions.CreateIncidentFail(error)))
      )
    )
  );


  @Effect()
  loadIncident$: Observable<Action> = this.actions$.pipe(
    ofType<incidentActions.LoadIncident>(
      incidentActions.IncidentActionType.LOAD_INCIDENT
    ),
    mergeMap((action: incidentActions.LoadIncident) =>
      this.incidentService.getIncidentById(action.payload).pipe(
        map(
          (incident: IncidentInterface) =>
            new incidentActions.LoadIncidentSuccess(incident)
        ),
        catchError(err => of(new incidentActions.LoadIncidentFail(err)))
      )
    )
  );

  @Effect()
  updateIncident$: Observable<Action> = this.actions$.pipe(
    ofType<incidentActions.UpdateIncident>(
      incidentActions.IncidentActionType.UPDATE_INCIDENT
    ),
    map((action: incidentActions.UpdateIncident) => action.payload),
    mergeMap((incident: IncidentInterface) =>
      this.incidentService.updateIncident(incident).pipe(
        map(
          (updateIncident: IncidentInterface) =>
            new incidentActions.UpdateIncidentSuccess({
              id: updateIncident.id,
              changes: updateIncident
            })
        ),
        catchError(error => of(new incidentActions.UpdateIncidentFail(error)))
      )
    )
  );
}

