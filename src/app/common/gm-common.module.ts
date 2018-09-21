import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonsterCardComponent } from "./monster-card/monster-card.component";
import { AlignmentTableComponent } from "./alignment-table/alignment-table.component";
import { MatGridListModule, MatButtonModule } from "@angular/material";

@NgModule({
	imports: [CommonModule, MatGridListModule, MatButtonModule],
	declarations: [MonsterCardComponent, AlignmentTableComponent],
	exports: [MonsterCardComponent, AlignmentTableComponent]
})
export class GmCommonModule {}
