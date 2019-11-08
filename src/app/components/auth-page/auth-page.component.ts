import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less']
})

export class AuthPageComponent implements OnInit {
  @Output() close = new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
  }
}
