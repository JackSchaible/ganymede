import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MatGridListModule,
	MatButtonModule,
	MatProgressSpinnerModule
} from "@angular/material";
import { ProcessingOverlayComponent } from "./processing-overlay/processing-overlay.component";
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
	imports: [
		CommonModule,
		MatGridListModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	declarations: [ProcessingOverlayComponent, SnackbarComponent],
	exports: [ProcessingOverlayComponent, SnackbarComponent],
	entryComponents: [SnackbarComponent]
})
export class GmCommonModule {}
