import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth.router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "../forms/forms.module";
import { RegisterComponent } from "./register/register.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/auth.reducers";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		FormsModule,
		StoreModule.forFeature("auth", reducers)
	],
	declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
