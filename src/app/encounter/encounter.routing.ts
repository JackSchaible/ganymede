import { Routes, RouterModule } from "@angular/router";
import { EncounterComponent } from "./encounter.component";
import { NgModule } from "@angular/core";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";

const routes: Routes = [
	{
		path: "encounter",
		component: EncounterComponent,
		children: [{ path: "", component: EncounterHomeComponent }]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EncounterRoutingModule {}
