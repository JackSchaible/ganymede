import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonsterCardComponent } from "./monster-card/monster-card.component";

@NgModule({
	imports: [CommonModule],
	declarations: [MonsterCardComponent],
	exports: [MonsterCardComponent]
})
export class GmCommonModule {}
