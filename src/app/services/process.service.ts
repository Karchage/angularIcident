import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';



import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ResponseInterface} from '../interfaces/response.interface';
import {ProcessInterface} from '../interfaces/process.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) {}

  getProcess(): Observable<ProcessInterface[]> {
    return this.http.get<ProcessInterface[]>(`${environment.fbDbUrl}/process.json`).pipe(
      map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key],
          }));
      })
    );
  }

  getProcessById(payload: string): Observable<ProcessInterface> {
    return this.http.get<ProcessInterface>(`${environment.fbDbUrl}/process/${payload}.json`);
  }

  createProcess(payload: ProcessInterface): Observable<ProcessInterface> {
    return this.http.patch(`${environment.fbDbUrl}/process/${payload.id}.json`, payload).pipe(
      map((response: ResponseInterface) => {
        return {
          ...payload,
          id: response.name,
        };
      }));
  }


  updateProcess(process: ProcessInterface): Observable<ProcessInterface> {
    return this.http.patch<ProcessInterface>(`${environment.fbDbUrl}/process/${process.id}.json`, process);
  }

  deleteProcess(payload: string) {
    return this.http.delete(`${environment.fbDbUrl}/process/${payload}.json`);
  }
}
