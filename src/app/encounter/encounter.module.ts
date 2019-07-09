import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterComponent } from "./encounter.component";
import { EncounterRoutingModule } from "./encounter.routing";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";
import { GmCommonModule } from "../common/gm-common.module";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { LayoutModule } from "@angular/cdk/layout";

@NgModule({
	imports: [
		CommonModule,
		EncounterRoutingModule,
		GmCommonModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		DragDropModule,
		LayoutModule,
		MatExpansionModule
	],
	declarations: [EncounterComponent, EncounterHomeComponent]
})
export class EncounterModule {}
