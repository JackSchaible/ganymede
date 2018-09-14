import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth.router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "../forms/forms.module";
import { RegisterComponent } from "./register/register.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		FormsModule
	],
	declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
