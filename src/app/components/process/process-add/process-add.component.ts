import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ProcessService} from '../../../services/process.service';
import * as ProcessActions from '../../../store/actions/process.action';
import {select, Store} from '@ngrx/store';
import * as fromProcesses from '../../../store/reducers/process.reducer';
import {Observable} from 'rxjs';

import {AppState} from '../../../store/state/app.state';


@Component({
  selector: 'app-process-add',
  templateUrl: './process-add.component.html',
  styleUrls: ['./process-add.component.less']
})



export class ProcessAddComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  addForm: FormGroup;
  processes$: Observable<ProcessInterface[]>;
  constructor(private fb: FormBuilder, private service: ProcessService, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ProcessActions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
      color: ['', Validators.required],
      transition: [''],
    });
  }

  add() {
    const newProc: ProcessInterface = {
      name: this.addForm.get('name').value,
      id: this.addForm.get('name').value,
      color: this.addForm.get('color').value,
      transition: this.addForm.get('transition').value
    };

    this.store.dispatch(new ProcessActions.CreateProcess(newProc));
    this.addForm.reset();
  }
}
