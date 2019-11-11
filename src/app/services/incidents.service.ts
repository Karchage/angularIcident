import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


import {IncidentInterface} from '../interfaces/incident.interface';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ResponseInterface} from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  constructor(private http: HttpClient) {}

  getIncidents(): Observable<IncidentInterface[]> {
    return this.http.get<IncidentInterface[]>(`${environment.fbDbUrl}/incidents.json`).pipe(
      map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key],
            dueDate: new Date(response[key].dueDate),
            startDate: new Date(response[key].startDate)
          }));
      })
    );
  }

  getIncidentById(payload: string): Observable<IncidentInterface> {
    return this.http.get<IncidentInterface>(`${environment.fbDbUrl}/incidents/${payload}.json`);
  }

  createIncident(payload: IncidentInterface): Observable<IncidentInterface> {
    return this.http.patch(`${environment.fbDbUrl}/incidents/${payload.id}.json`, payload).pipe(
      map((response: IncidentInterface) => {
        return {
          ...payload,
          id: response.id,
          startDate: new Date(payload.startDate),
          dueDate: new Date(payload.dueDate),
        };
      }));
  }
  createIncidentNew(payload: IncidentInterface): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(`${environment.fbDbUrl}/incidents.json`, payload);
  }

  updateIncident(incident: IncidentInterface): Observable<IncidentInterface> {
    return this.http.patch<IncidentInterface>(`${environment.fbDbUrl}/incidents/${incident.id}.json`, incident);
  }

  deleteIncident(payload: string) {
    return this.http.delete(`${environment.fbDbUrl}/incidents/${payload}.json`);
  }
}
