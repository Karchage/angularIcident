import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {RegInterface, RegResponseInterface} from '../interfaces/userReg.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  registerUser(regUser: RegInterface): Observable<RegResponseInterface> {
    regUser.returnSecureToken = true;
    return this.http.post<RegResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, regUser);
  }

}
