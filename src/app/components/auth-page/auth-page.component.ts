import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromUser from '../../store/reducers/user.reducer';
import * as userActions from '../../store/actions/user.action';
import {RegInterface} from '../../interfaces/userReg.interface';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})


export class AuthPageComponent implements OnInit {
  userRegForm: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private store: Store<fromUser.AppState>,
              private auth: AuthService) { }

  ngOnInit() {

    this.userRegForm = this.fb.group({
      email:  ['', Validators.required],
      password:  ['', Validators.required],
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      position: ['', Validators.required],
    });
  }



  RegUsers() {
    const regUser: RegInterface = {
      email: this.userRegForm.get('email').value,
      password: this.userRegForm.get('password').value
    };
    console.log(regUser);
    const regUSR: UserInterface = {
      name: this.userRegForm.get('name').value,
      DOB: this.userRegForm.get('DOB').value,
      position: this.userRegForm.get('position').value,
    };
    this.auth.regUser(regUser).subscribe(
      response => {console.log('Reg USR');
                   regUSR.id = response.localId;
                   this.store.dispatch(new userActions.CreateUser(regUSR)); });

    this.userRegForm.reset();
  }

}
