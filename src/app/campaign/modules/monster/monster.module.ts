import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonsterRoutingModule } from "./monster-routing.module";
import { GmCommonModule } from "src/app/common/gm-common.module";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MonsterListComponent } from "./components/monster-list/monster-list.component";

@NgModule({
	declarations: [MonsterListComponent],
	imports: [
		CommonModule,
		MonsterRoutingModule,
		GmCommonModule,
		MatButtonModule,
		MatExpansionModule
	]
})
export class MonsterModule {}
