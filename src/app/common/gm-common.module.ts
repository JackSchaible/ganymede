import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonsterCardComponent } from "./monster-card/monster-card.component";
import { AlignmentTableComponent } from "./alignment-table/alignment-table.component";
import { MatGridListModule, MatButtonModule } from "@angular/material";
import { SpellCardComponent } from "./spell-card/spell-card.component";

@NgModule({
	imports: [CommonModule, MatGridListModule, MatButtonModule],
	declarations: [
		MonsterCardComponent,
		AlignmentTableComponent,
		SpellCardComponent
	],
	exports: [SpellCardComponent, MonsterCardComponent, AlignmentTableComponent]
})
export class GmCommonModule {}
