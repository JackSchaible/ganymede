import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterTrackerComponent } from './encounter-tracker.component';

describe('EncounterTrackerComponent', () => {
  let component: EncounterTrackerComponent;
  let fixture: ComponentFixture<EncounterTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
