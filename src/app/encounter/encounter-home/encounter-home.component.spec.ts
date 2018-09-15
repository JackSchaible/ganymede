import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterHomeComponent } from './encounter-home.component';

describe('EncounterHomeComponent', () => {
  let component: EncounterHomeComponent;
  let fixture: ComponentFixture<EncounterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
