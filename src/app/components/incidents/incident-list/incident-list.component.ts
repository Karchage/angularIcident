import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IncidentInterface} from '../../../interfaces/incident.interface';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../../../store/reducers/user.reducer';
import * as fromIncidents from '../../../store/reducers/incident.reducer';
import * as IncidentActions from '../../../store/actions/incident.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.less']
})
export class IncidentListComponent implements OnInit {
  incidents$: Observable<IncidentInterface[]>;
  modal = false;
  constructor(private store: Store<fromUser.AppState>,
              private route: Router) { }

  @Output()
  incidentSelected: EventEmitter<string> = new EventEmitter();
  ngOnInit() {
    this.store.dispatch(new IncidentActions.LoadIncidents());
    this.incidents$ = this.store.pipe(select(fromIncidents.getIncidents));
  }
  selectIncident(id: string) {
    this.route.navigate(['incidents', id]);
  }
}
