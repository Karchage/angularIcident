import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IncidentInterface} from '../../../interfaces/incident.interface';
import * as fromUser from '../../../store/reducers/user.reducer';
import {select, Store} from '@ngrx/store';
import * as IncidentActions from '../../../store/actions/incident.action';
import * as fromIncidents from '../../../store/reducers/incident.reducer';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProcessInterface} from '../../../interfaces/process.interface';
import * as ProcessAcrions from '../../../store/actions/process.action';
import * as fromProcesses from '../../../store/reducers/process.reducer';
import {UserInterface} from '../../../interfaces/user.interface';
import * as userActions from '../../../store/actions/user.action';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {CustomValidators} from '../../../customValidators';





@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.less']
})
export class IncidentDetailComponent implements OnInit {

  curentRul = [];
  editForm: FormGroup;
  incident$: Observable<IncidentInterface>;
  processes$: Observable<ProcessInterface[]>;
  users$: Observable<UserInterface[]>;
  incident: IncidentInterface;
  constructor(private store: Store<fromUser.AppState>, private router: ActivatedRoute, private fb: FormBuilder ) { }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
    this.store.dispatch(new IncidentActions.LoadIncident(this.router.snapshot.params.id));
    this.incident$ = this.store.pipe(select(fromIncidents.getCurrentIncident));
    this.incident$.subscribe(response => {
      this.incident = {...response};
      this.editForm = this.fb.group({
        dueDate: [this.incident.dueDate, [Validators.required, CustomValidators.dueDateValidator]],
        assignee: [this.incident.assignee],
        description: [this.incident.description, Validators.required],
        status: [this.incident.status, Validators.required],
        icon: [this.incident.icon]
      });
    });
    this.store.dispatch(new ProcessAcrions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
    this.processes$.subscribe(responseProc => {
      if (responseProc) {
        for (const inc of responseProc) {
          if (this.incident.status === inc.name) {
            this.curentRul = inc.transition;
            console.log(inc.transition);
          } else { this.curentRul = []; }
        }
      }
    });
  }

  editIncident() {
    this.incident = {
      id: this.incident.id,
      area: this.incident.area,
      icon: this.editForm.get('icon').value,
      name: this.incident.name,
      priority: this.incident.priority,
      startDate: this.incident.startDate,
      dueDate: this.editForm.get('dueDate').value,
      assignee: this.editForm.get('assignee').value,
      description: this.editForm.get('description').value,
      status: this.editForm.get('status').value
    };
    console.log(this.incident);
    this.store.dispatch(new IncidentActions.UpdateIncident(this.incident));
  }
}
