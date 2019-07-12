import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule({
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule
	],
	declarations: [ValidationMessageComponent],
	exports: [
		ValidationMessageComponent,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule
	]
})
export class FormsModule {}
