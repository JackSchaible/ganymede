import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterComponent } from "./encounter.component";
import { EncounterRoutingModule } from "./encounter.routing";
import { EncounterHomeComponent } from "./encounter-home/encounter-home.component";
import { GmCommonModule } from "../common/gm-common.module";
import {
	MatInputModule,
	MatButtonModule,
	MatExpansionModule
} from "@angular/material";
import { FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DeviceDetectorModule } from "ngx-device-detector";

@NgModule({
	imports: [
		CommonModule,
		EncounterRoutingModule,
		GmCommonModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		DragDropModule,
		DeviceDetectorModule,
		MatExpansionModule
	],
	declarations: [EncounterComponent, EncounterHomeComponent]
})
export class EncounterModule {}
