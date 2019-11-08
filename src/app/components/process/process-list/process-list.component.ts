import { Component, OnInit } from '@angular/core';
import {ProcessInterface} from '../../../interfaces/process.interface';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.less']
})


export class ProcessListComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
