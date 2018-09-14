import { Routes, RouterModule } from "@angular/router";
import { EncounterComponent } from "./encounter/encounter.component";
import { EncounterTrackerComponent } from "./encounter-tracker/encounter-tracker.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
	{
		path: "encounter",
		component: EncounterComponent,
		children: [
			{
				path: "",
				children: [
					{ path: "encounter-tracker", component: EncounterTrackerComponent }
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EncounterRoutingModule {}
