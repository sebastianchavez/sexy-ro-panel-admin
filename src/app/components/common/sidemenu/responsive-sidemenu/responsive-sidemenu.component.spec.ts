import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveSidemenuComponent } from './responsive-sidemenu.component';

describe('ResponsiveSidemenuComponent', () => {
  let component: ResponsiveSidemenuComponent;
  let fixture: ComponentFixture<ResponsiveSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveSidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
