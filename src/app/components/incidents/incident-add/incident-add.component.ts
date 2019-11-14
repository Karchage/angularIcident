import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncidentInterface} from '../../../interfaces/incident.interface';
import * as incidentActions from '../../../store/actions/incident.action';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../../../store/reducers/user.reducer';
import {IncidentsService} from '../../../services/incidents.service';
import * as userActions from '../../../store/actions/user.action';
import {Observable} from 'rxjs';
import {UserInterface} from '../../../interfaces/user.interface';
import {CustomValidators} from '../../../customValidators';
import {AppState} from '../../../store/state/app.state';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.less']
})
export class IncidentAddComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  users$: Observable<UserInterface[]>;
  nowDate =  new Date();
  addForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private create: IncidentsService) { }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      assignee: [''],
      area: ['', Validators.required],
      startDate: [this.nowDate],
      dueDate: ['', [Validators.required, CustomValidators.dueDateValidator]],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      icon: [''],
      status: ['start']
    });
  }

  addNewIncident() {
    const newIncident: IncidentInterface = {
      name: this.addForm.get('name').value,
      assignee: this.addForm.get('assignee').value,
      area: this.addForm.get('area').value,
      startDate: this.nowDate,
      dueDate: this.addForm.get('dueDate').value,
      description: this.addForm.get('description').value,
      priority: this.addForm.get('priority').value,
      icon: this.addForm.get('icon').value,
      status: 'start',
    };
    this.create.createIncidentNew(newIncident).subscribe(
        response => {
                     newIncident.id = response.name;
                     this.store.dispatch(new incidentActions.CreateIncident(newIncident)); });
    this.addForm.reset();
  }



}

