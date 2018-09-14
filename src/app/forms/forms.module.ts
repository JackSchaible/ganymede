import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import {
	MatInputModule,
	MatIconModule,
	MatFormFieldModule,
	MatButtonModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatButtonModule
	],
	declarations: [ValidationMessageComponent],
	exports: [
		ValidationMessageComponent,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatButtonModule
	]
})
export class FormsModule {}
