import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizePvpComponent } from './prize-pvp.component';

describe('PrizePvpComponent', () => {
  let component: PrizePvpComponent;
  let fixture: ComponentFixture<PrizePvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizePvpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizePvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
