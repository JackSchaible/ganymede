import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
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
