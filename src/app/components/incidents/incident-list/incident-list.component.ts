import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IncidentInterface} from '../../../interfaces/incident.interface';
import {select, Store} from '@ngrx/store';
import * as fromIncidents from '../../../store/reducers/incident.reducer';
import * as IncidentActions from '../../../store/actions/incident.action';
import {Router} from '@angular/router';
import {ProcessInterface} from '../../../interfaces/process.interface';
import * as ProcessActions from '../../../store/actions/process.action';
import * as fromProcesses from '../../../store/reducers/process.reducer';
import {AppState} from '../../../store/state/app.state';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.less']
})
export class IncidentListComponent implements OnInit {
  search = '';
  incidents$: Observable<IncidentInterface[]>;
  processes$: Observable<ProcessInterface[]>;
  modal = false;
  constructor(private store: Store<AppState>,
              private route: Router) { }

  @Output()
  incidentSelected: EventEmitter<string> = new EventEmitter();
  ngOnInit() {
    this.store.dispatch(new IncidentActions.LoadIncidents());
    this.incidents$ = this.store.pipe(select(fromIncidents.getIncidents));
    this.store.dispatch(new ProcessActions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
    this.incidents$.subscribe(response => {
      this.processes$.subscribe(responseProcess => {
        for (const inc of response) {
          for (const proc of responseProcess) {
            if (inc.status === proc.name) {
              inc.icon = proc.color;
            }
          }
        }
      });
    });

  }

  selectIncident(id: string) {
    this.route.navigate(['incidents', id]);
  }
}
