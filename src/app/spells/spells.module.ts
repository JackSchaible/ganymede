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
	MatPaginatorModule
} from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		SpellsRoutingModule,
		FormsModule,
		MatTableModule,
		MatCardModule,
		MatPaginatorModule
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
