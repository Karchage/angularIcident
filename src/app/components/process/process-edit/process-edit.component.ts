import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';


import * as ProcessActions from '../../../store/actions/process.action';
import * as fromProcesses from '../../../store/reducers/process.reducer';
import {Observable} from 'rxjs';
import {AppState} from '../../../store/state/app.state';


@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.less']
})
export class ProcessEditComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  processes$: Observable<ProcessInterface[]>;
  currentProcessLog: ProcessInterface;
  edit: FormGroup;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.edit = this.fb.group(
      {
        name: ['', Validators.required],
        color: ['', Validators.required],
        id: ['', Validators.required],
        transition: ['', Validators.required],
        newTransition: ['']
      });
    this.store.dispatch(new ProcessActions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
    const process$: Observable<ProcessInterface> = this.store.select(
      fromProcesses.getCurrentProcess
    );

    process$.subscribe(currentProcess => {
      if (currentProcess) {
        this.currentProcessLog = currentProcess;
        this.edit.patchValue({
          name: currentProcess.name,
          color: currentProcess.color,
          id: currentProcess.id,
          transition: currentProcess.transition
        });
      }
    });
  }
  updateProcess() {
    const updatedProcess: ProcessInterface = {
      transition: this.edit.get('newTransition').value,
      name: this.edit.get('name').value,
      color: this.edit.get('color').value,
      id: this.currentProcessLog.id,
    };
    this.store.dispatch(new ProcessActions.UpdateProcess(updatedProcess));
  }
}
