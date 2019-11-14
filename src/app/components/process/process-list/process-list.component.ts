import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as ProcessActions from '../../../store/actions/process.action';
import * as fromProcesses from '../../../store/reducers/process.reducer';
import {AppState} from '../../../store/state/app.state';


@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.less']
})


export class ProcessListComponent implements OnInit {
  @Output() process: EventEmitter<ProcessInterface> = new EventEmitter();
  modal = false;
  modalEdit = false;
  processes$: Observable<ProcessInterface[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ProcessActions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
  }
  editProcess(proc: ProcessInterface) {
    this.store.dispatch(new ProcessActions.LoadProcess(proc.id));
  }

  deleteProcess(proc: ProcessInterface) {
    if (confirm('Sure ?')) {
      this.store.dispatch( new ProcessActions.DeleteProcess(proc.id));
    }
  }
}
