import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CastingTimeComponent } from "./casting-time/casting-time.component";
import { SpellComponentsComponent } from "./spell-components/spell-components.component";
import { SpellDurationComponent } from "./spell-duration/spell-duration.component";
import { SpellRangeComponent } from "./spell-range/spell-range.component";
import { SpellListComponent } from "./spell-list/spell-list.component";
import { SpellEditComponent } from "./spell-edit/spell-edit.component";
import { SpellRoutingModule } from "./spell-routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { GmCommonModule } from "src/app/common/gm-common.module";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpellDisplayComponent } from "./spell-display/spell-display.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
	declarations: [
		CastingTimeComponent,
		SpellComponentsComponent,
		SpellDurationComponent,
		SpellRangeComponent,
		SpellListComponent,
		SpellEditComponent,
		SpellDisplayComponent
	],
	imports: [
		CommonModule,
		SpellRoutingModule,
		MatExpansionModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatCheckboxModule,
		MatRadioModule,
		GmCommonModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatSnackBarModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class SpellModule {}
