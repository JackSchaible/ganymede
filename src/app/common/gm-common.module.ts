import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProcessingOverlayComponent } from "./processing-overlay/processing-overlay.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { ModalComponent } from "./modal/modal.component";
import { KeyCommandComponent } from "./key-command/key-command.component";

@NgModule({
	imports: [
		CommonModule,
		MatGridListModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatDialogModule
	],
	declarations: [
		ProcessingOverlayComponent,
		SnackbarComponent,
		ModalComponent,
		KeyCommandComponent
	],
	exports: [
		ProcessingOverlayComponent,
		KeyCommandComponent,
		SnackbarComponent,
		ModalComponent
	],
	entryComponents: [SnackbarComponent, ModalComponent]
})
export class GmCommonModule {}
