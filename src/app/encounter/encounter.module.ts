import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterTrackerComponent } from "./encounter-tracker/encounter-tracker.component";
import { EncounterComponent } from "./encounter.component";
import { MatTabsModule } from "@angular/material/tabs";
import { EncounterRoutingModule } from "./encounter.routing";
import { MatCardModule, MatButtonModule } from "@angular/material";
import { MatGridListModule } from "@angular/material/grid-list";
import { MonsterComponent } from "./monster/monster.component";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";

@NgModule({
	imports: [
		CommonModule,
		MatTabsModule,
		EncounterRoutingModule,
		MatCardModule,
		MatGridListModule,
		MatButtonModule
	],
	declarations: [
		EncounterTrackerComponent,
		EncounterComponent,
		MonsterComponent,
		EncounterHomeComponent
	]
})
export class EncounterModule {}
