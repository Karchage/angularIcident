import { Component, OnInit } from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-process-add',
  templateUrl: './process-add.component.html',
  styleUrls: ['./process-add.component.less']
})

// tslint:disable-next-line:class-name

export class ProcessAddComponent implements OnInit {
  addForm: FormGroup;
  start: ProcessInterface = {
    color: 'blue',
    id: 'start',
    name: 'start',
    transition: ['work', 'close']

  };
  work: ProcessInterface = {
    color: 'blue',
    id: 'work',
    name: 'work',
    transition: ['close']

  };
  close: ProcessInterface = {
    color: 'blue',
    id: 'close',
    name: 'close',
    transition: []

  };
  processAll: ProcessInterface[] = [this.start, this.work, this.close];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
    console.log(newProc);
  }
}
