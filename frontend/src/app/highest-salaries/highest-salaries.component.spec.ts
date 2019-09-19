import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestSalariesComponent } from './highest-salaries.component';

describe('HighestSalariesComponent', () => {
  let component: HighestSalariesComponent;
  let fixture: ComponentFixture<HighestSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighestSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
