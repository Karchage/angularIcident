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
import {CustomValidators} from '../../../customValidators';
import {AppState} from '../../../store/state/app.state';



@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.less']
})
export class IncidentDetailComponent implements OnInit {

  currentRul = [];

  editForm: FormGroup;
  incident$: Observable<IncidentInterface>;
  processes$: Observable<ProcessInterface[]>;
  users$: Observable<UserInterface[]>;
  incident: IncidentInterface;
  private newStatus;
  constructor(private store: Store<AppState>, private router: ActivatedRoute, private fb: FormBuilder ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      dueDate: ['', [Validators.required, CustomValidators.dueDateValidator]],
      assignee: [''],
      description: ['', Validators.required],
      status: ['', Validators.required],
      icon: ['']
    });
    this.store.dispatch(new userActions.LoadUsers());
    this.store.dispatch(new IncidentActions.LoadIncident(this.router.snapshot.params.id));
    this.store.dispatch(new ProcessAcrions.LoadProcesses());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
    this.incident$ = this.store.pipe(select(fromIncidents.getCurrentIncident));
    this.incident$.subscribe(response => {
      this.incident = {...response};
      this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
      this.processes$.subscribe(responseProc => {
        if (responseProc) {
          for (const inc of responseProc) {
            if (inc.transition.length !== 0) {
              if (this.incident.status === inc.name) {
                this.incident.icon = inc.color;
                this.currentRul = inc.transition;
              }
            } else {
              this.currentRul = null;
            }
          }
          this.editForm.patchValue({
            dueDate: this.incident.dueDate,
            assignee: this.incident.assignee,
            description: this.incident.description,
            status: this.incident.status,
            icon: this.incident.icon
          });

        }
      });
    });
  }


  editIncident() {
    if (this.editForm.get('status').value === '') {
      this.newStatus = this.incident.status;
    } else { this.newStatus = this.editForm.get('status').value; }
    this.incident = {
      id: this.incident.id,
      area: this.incident.area,
      icon: this.editForm.get('icon').value,
      name: this.incident.name,
      priority: this.incident.priority,
      startDate: new Date(this.incident.startDate),
      dueDate: new Date(this.editForm.get('dueDate').value),
      assignee: this.editForm.get('assignee').value,
      description: this.editForm.get('description').value,
      status: this.newStatus
    };
    this.store.dispatch(new IncidentActions.UpdateIncident(this.incident));
  }
}
