import { Component, OnInit } from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../interfaces/user.interface';
import {ProcessService} from '../../../services/process.service';
import * as ProcessAcrions from '../../../store/actions/process.action';
import {select, Store} from '@ngrx/store';
import * as fromProcesses from '../../../store/reducers/process.reducer';
import {Observable} from 'rxjs';
import * as fromUser from '../../../store/reducers/user.reducer';

@Component({
  selector: 'app-process-add',
  templateUrl: './process-add.component.html',
  styleUrls: ['./process-add.component.less']
})

// tslint:disable-next-line:class-name

export class ProcessAddComponent implements OnInit {
  addForm: FormGroup;
  processes$: Observable<ProcessInterface[]>
  constructor(private fb: FormBuilder, private service: ProcessService, private store: Store<fromUser.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ProcessAcrions.LoadProcesses());
    this.processes$ = this.store.pipe(select(fromProcesses.getProcesses));
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      color: ['', Validators.required],
      transition: ['', Validators.required],
    });
  }

  add() {
    const newProc: ProcessInterface = {
      name: this.addForm.get('name').value,
      id: this.addForm.get('name').value,
      color: this.addForm.get('color').value,
      transition: this.addForm.get('transition').value
    };

    // tslint:disable-next-line:no-unused-expression
    this.service.createProcess(newProc).subscribe(response => console.log(response));
    console.log(newProc);
  }
}
