import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatewiseDataComponent } from './statewise-data.component';

describe('StatewiseDataComponent', () => {
  let component: StatewiseDataComponent;
  let fixture: ComponentFixture<StatewiseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatewiseDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatewiseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
