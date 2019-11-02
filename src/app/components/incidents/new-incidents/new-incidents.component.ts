import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-incidents',
  templateUrl: './new-incidents.component.html',
  styleUrls: ['./new-incidents.component.less']
})
export class NewIncidentsComponent implements OnInit {

  @Output() close = new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
  }

}
