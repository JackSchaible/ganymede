import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterTrackerComponent } from './encounter-tracker/encounter-tracker.component';
import { EncounterComponent } from './encounter/encounter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EncounterTrackerComponent, EncounterComponent]
})
export class EncounterModule { }
