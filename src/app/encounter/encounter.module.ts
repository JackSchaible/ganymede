import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterTrackerComponent } from "./encounter-tracker/encounter-tracker.component";
import { EncounterComponent } from "./encounter/encounter.component";
import { MatTabsModule } from "@angular/material/tabs";
import { EncounterRoutingModule } from "./encounter.routing";
import { MatCardModule } from "@angular/material";

@NgModule({
	imports: [CommonModule, MatTabsModule, EncounterRoutingModule, MatCardModule],
	declarations: [EncounterTrackerComponent, EncounterComponent]
})
export class EncounterModule {}
