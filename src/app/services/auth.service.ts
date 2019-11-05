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

  regUser(regUser: RegInterface): Observable<RegResponseInterface> {
    console.log(regUser);
    regUser.returnSecureToken = true;
    // tslint:disable-next-line:max-line-length
    return this.http.post<RegResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, regUser);
  }
  loginUser() {
  }
  logoutUser() {
  }
}
