import {Component, OnInit} from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as userActions from '../../store/actions/user.action';
import {RegInterface} from '../../interfaces/userReg.interface';
import {AuthService} from '../../services/auth.service';
import {CustomValidators} from '../../customValidators';
import {AppState} from '../../store/state/app.state';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.less']
})


export class RegisterPageComponent implements OnInit {
  userRegForm: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private store: Store<AppState>,
              private auth: AuthService) { }

  ngOnInit() {

    this.userRegForm = this.fb.group({
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, CustomValidators.checkNumberInName]],
      DOB: ['', Validators.required, CustomValidators.dueDateValidator],
      position: ['', Validators.required],
    });
  }



  RegUsers() {
    const regUser: RegInterface = {
      email: this.userRegForm.get('email').value,
      password: this.userRegForm.get('password').value
    };
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
