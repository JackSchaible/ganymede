import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MatGridListModule,
	MatButtonModule,
	MatProgressSpinnerModule
} from "@angular/material";
import { ProcessingOverlayComponent } from "./processing-overlay/processing-overlay.component";

@NgModule({
	imports: [
		CommonModule,
		MatGridListModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	declarations: [ProcessingOverlayComponent],
	exports: [ProcessingOverlayComponent]
})
export class GmCommonModule {}
