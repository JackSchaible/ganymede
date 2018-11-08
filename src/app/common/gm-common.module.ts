import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonsterCardComponent } from "./monster-card/monster-card.component";
import { AlignmentTableComponent } from "./alignment-table/alignment-table.component";
import {
	MatGridListModule,
	MatButtonModule,
	MatProgressSpinnerModule
} from "@angular/material";
import { SpellCardComponent } from "./spell-card/spell-card.component";
import { ProcessingOverlayComponent } from "./processing-overlay/processing-overlay.component";

@NgModule({
	imports: [
		CommonModule,
		MatGridListModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	declarations: [
		MonsterCardComponent,
		AlignmentTableComponent,
		SpellCardComponent,
		ProcessingOverlayComponent
	],
	exports: [
		SpellCardComponent,
		MonsterCardComponent,
		AlignmentTableComponent,
		ProcessingOverlayComponent
	]
})
export class GmCommonModule {}
