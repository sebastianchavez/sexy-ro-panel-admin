import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLockComponent } from './process-lock.component';

describe('ProcessLockComponent', () => {
  let component: ProcessLockComponent;
  let fixture: ComponentFixture<ProcessLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
