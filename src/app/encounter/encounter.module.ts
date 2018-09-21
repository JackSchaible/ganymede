import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterTrackerComponent } from "./encounter-tracker/encounter-tracker.component";
import { EncounterComponent } from "./encounter.component";
import { MatTabsModule } from "@angular/material/tabs";
import { EncounterRoutingModule } from "./encounter.routing";
import {
	MatCardModule,
	MatButtonModule,
	MatStepperModule,
	MatAutocompleteModule,
	MatChipsModule,
	MatSnackBarModule
} from "@angular/material";
import { MatGridListModule } from "@angular/material/grid-list";
import { MonsterComponent } from "./monster/monster.component";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";
import { GmCommonModule } from "../common/gm-common.module";
import { FormsModule } from "../forms/forms.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		MatTabsModule,
		EncounterRoutingModule,
		MatCardModule,
		MatGridListModule,
		MatButtonModule,
		GmCommonModule,
		FormsModule,
		ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
		MatStepperModule,
		MatAutocompleteModule,
		MatChipsModule,
		MatSnackBarModule
	],
	declarations: [
		EncounterTrackerComponent,
		EncounterComponent,
		MonsterComponent,
		EncounterHomeComponent
	]
})
export class EncounterModule {}
