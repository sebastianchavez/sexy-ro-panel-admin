import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalSidemenuComponent } from './normal-sidemenu.component';

describe('NormalSidemenuComponent', () => {
  let component: NormalSidemenuComponent;
  let fixture: ComponentFixture<NormalSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalSidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
