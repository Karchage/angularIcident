import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCurrentComponent } from './process-current.component';

describe('ProcessCurrentComponent', () => {
  let component: ProcessCurrentComponent;
  let fixture: ComponentFixture<ProcessCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
