import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpellsListComponent } from "./spells-list/spells-list.component";
import { SpellEditComponent } from "./spell-edit/spell-edit.component";
import { SpellsRoutingModule } from "./spells.routing";
import { FormsModule } from "../forms/forms.module";
import { SpellsComponent } from "./spells.component";
import {
	MatCardModule,
	MatTableModule,
	MatPaginatorModule,
	MatOptionModule,
	MatSelectModule,
	MatAutocompleteModule,
	MatChipsModule,
	MatInputModule,
	MatCheckboxModule,
	MatExpansionModule,
	MatDialogModule
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { GmCommonModule } from "../common/gm-common.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		SpellsRoutingModule,
		FormsModule,
		MatTableModule,
		MatCardModule,
		MatPaginatorModule,
		MatButtonModule,
		MatOptionModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatChipsModule,
		MatInputModule,
		GmCommonModule,
		ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
		MatCheckboxModule,
		MatExpansionModule,
		MatDialogModule
	],
	declarations: [SpellsComponent, SpellsListComponent, SpellEditComponent]
})
export class SpellsModule {
	private columns = [
		"name",
		"level",
		"castingTime",
		"range",
		"components",
		"duration"
	];
}
