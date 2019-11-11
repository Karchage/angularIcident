import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


import {UserInterface} from '../interfaces/user.interface';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ResponseInterface} from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.fbDbUrl}/users.json`).pipe(
      map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key],
            DOB: new Date(response[key].DOB)
          }));
      })
    );
  }

  getUserById(payload: string): Observable<UserInterface> {
    console.log('Get info user');
    console.log(payload);
    return this.http.get<UserInterface>(`${environment.fbDbUrl}/users/${payload}.json`);
  }

  createUser(payload: UserInterface): Observable<UserInterface> {
    console.log('Create user');
    console.log(payload);
    return this.http.patch(`${environment.fbDbUrl}/users/${payload.id}.json`, payload).pipe(
      map((response: ResponseInterface) => {
        return {
          ...payload,
          id: response.name,
          DOB: new Date(payload.DOB),
        };
        }));
  }


  updateUser(user: UserInterface): Observable<UserInterface> {
    return this.http.patch<UserInterface>(`${environment.fbDbUrl}/users/${user.id}.json`, user);
  }

  deleteUser(payload: string) {
    const deleteUsr = {
      idToken: null
    };
    console.log(deleteUsr);
    this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${environment.apiKey}`, deleteUsr).subscribe();
    return this.http.delete(`${environment.fbDbUrl}/users/${payload}.json`);
  }
}
