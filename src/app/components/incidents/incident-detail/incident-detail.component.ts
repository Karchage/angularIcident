import {Component, OnDestroy, OnInit} from '@angular/core';
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
  loading: boolean;
  constructor(private store: Store<fromUser.AppState>, private router: ActivatedRoute, private fb: FormBuilder ) { }

  ngOnInit() {

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
            if (responseProc.toString().includes(this.incident.status)) {
            if (this.incident.status === inc.name) {
              this.incident.icon = inc.color;
              this.currentRul = inc.transition;
            }
            } else this.incident.status = 'start';}
          this.editForm = this.fb.group({
        dueDate: [this.incident.dueDate, [Validators.required, CustomValidators.dueDateValidator]],
        assignee: [this.incident.assignee],
        description: [this.incident.description, Validators.required],
        status: [this.incident.status, Validators.required],
        icon: [this.incident.icon]
      });
        }
      });
    });
  }
  //
  // private getInfoIncident(loading) {
  //   const promise = new Promise(function(resolve, reject) {
  //     this.store.pipe(select(fromIncidents.getCurrentIncident)).subscribe(response => {
  //       this.incident = {...response};
  //     });
  //     if (this.incident) {
  //       this.loading = true;
  //       resolve (this.incident);
  //     } else {
  //       this.loading = false;
  //       reject('loading incident error');
  //     }
  //   });
  //   return promise;
  // }
  // private getInfoProcess(loading) {
  //   this.store.pipe(select(fromProcesses.getProcesses)).subscribe(responseProc => {
  //     console.log('Subscribe on process');
  //     if (responseProc) {
  //       for (const inc of responseProc) {
  //         if (this.incident.status === inc.name) {
  //           console.log(this.incident.status, ' = ' , inc.name);
  //           this.incident.icon = inc.color;
  //           this.currentRul = inc.transition;
  //           console.log(inc.transition);
  //         }  }   }
  //     console.log('rul', this.currentRul);
  //   });
  //   if (this.currentRul) {
  //     return Promise.resolve(this.currentRul);
  //   } else {
  //     this.loading = false;
  //     Promise.reject('loading process error');
  //   }
  // }
  // private createForm(loading) {
  //   if (true) {
  //     this.editForm = this.fb.group({
  //       dueDate: [this.incident.dueDate, [Validators.required, CustomValidators.dueDateValidator]],
  //       assignee: [this.incident.assignee],
  //       description: [this.incident.description, Validators.required],
  //       status: [this.incident.status, Validators.required],
  //       icon: [this.incident.icon]
  //     });
  //     this.loading = true;
  //     return Promise.resolve(loading);
  //   } else {
  //     this.loading = false;
  //     Promise.reject('Create form error');
  //   }
  // }

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
