import { Routes, RouterModule } from "@angular/router";
import { EncounterComponent } from "./encounter.component";
import { EncounterTrackerComponent } from "./encounter-tracker/encounter-tracker.component";
import { NgModule } from "@angular/core";
import { MonsterComponent } from "./monster/monster.component";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";

const routes: Routes = [
	{
		path: "encounter",
		component: EncounterComponent,
		children: [
			{ path: "", component: EncounterHomeComponent },
			{ path: "encounter-tracker", component: EncounterTrackerComponent },
			{ path: "monster", component: MonsterComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EncounterRoutingModule {}
