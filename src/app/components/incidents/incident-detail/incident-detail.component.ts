import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IncidentInterface} from '../../../interfaces/incident.interface';
import * as fromUser from '../../../store/reducers/user.reducer';
import {select, Store} from '@ngrx/store';
import * as IncidentActions from '../../../store/actions/incident.action';
import * as fromIncidents from '../../../store/reducers/incident.reducer';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';





@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.less']
})
export class IncidentDetailComponent implements OnInit {
  editForm: FormGroup;
  incident$: Observable<IncidentInterface>;
  incident: IncidentInterface;
  constructor(private store: Store<fromUser.AppState>, private router: ActivatedRoute, private fb: FormBuilder ) { }

  ngOnInit() {
    this.store.dispatch(new IncidentActions.LoadIncident(this.router.snapshot.params.id));
    this.incident$ = this.store.pipe(select(fromIncidents.getCurrentIncident));
    this.incident$.subscribe(response => {
      this.incident = {...response};
      this.editForm = this.fb.group({
        dueDate: [this.incident.dueDate, Validators.required],
        assignee: [this.incident.assignee, Validators.required],
        description: [this.incident.description, Validators.required],
        status: [this.incident.status, Validators.required],
        icon: [this.incident.icon, Validators.required]
      });
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
