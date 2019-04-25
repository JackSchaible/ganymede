import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterComponent } from "./encounter.component";
import { EncounterRoutingModule } from "./encounter.routing";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";
import { GmCommonModule } from "../common/gm-common.module";

@NgModule({
	imports: [CommonModule, EncounterRoutingModule, GmCommonModule],
	declarations: [EncounterComponent, EncounterHomeComponent]
})
export class EncounterModule {}
