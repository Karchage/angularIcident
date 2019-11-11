import { Component, OnInit } from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';
import {ProcessService} from '../../../services/process.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../../../store/reducers/user.reducer';
import * as ProcessAcrions from '../../../store/actions/process.action';
import * as fromProcesses from '../../../store/reducers/process.reducer';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.less']
})


export class ProcessListComponent implements OnInit {

  processes$: Observable<ProcessInterface[]>;
  constructor(private store: Store<fromUser.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ProcessAcrions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
  }

}
