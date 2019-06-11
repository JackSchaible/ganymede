import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonstersHomeComponent } from "./monsters-home/monsters-home.component";
import { MonsterRoutingModule } from "./monster-routing.module";
import { GmCommonModule } from "src/app/common/gm-common.module";
import { MatButtonModule, MatExpansionModule } from "@angular/material";

@NgModule({
	declarations: [MonstersHomeComponent],
	imports: [
		CommonModule,
		MonsterRoutingModule,
		GmCommonModule,
		MatButtonModule,
		MatExpansionModule
	]
})
export class MonsterModule {}
