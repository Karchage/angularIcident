import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


import {UserInterface} from '../interfaces/user.interface';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.fbDbUrl}/users.json`).pipe(
      map((response: {[key: string]: any}) =>{
        return Object
          .keys(response)
          .map( key => ({
            ...response[key],
            uid:key,
            date: new Date(response[key].date)
          }));
      })
    );
  }

  getUserById(payload: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.fbDbUrl}/${payload}`);
  }

  createUser(payload: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(environment.fbDbUrl, payload);
  }

  updateUser(user: UserInterface): Observable<UserInterface> {
    return this.http.patch<UserInterface>(
      `${environment.fbDbUrl}/${user.uid}`,
      user
    );
  }

  deleteUser(payload: number) {
    return this.http.delete(`${environment.fbDbUrl}/users/${payload}.json`);
  }
}
