import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCalculatorComponent } from './cr-calculator.component';

describe('CrCalculatorComponent', () => {
  let component: CrCalculatorComponent;
  let fixture: ComponentFixture<CrCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
