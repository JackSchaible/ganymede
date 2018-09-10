import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth.router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "../forms/forms.module";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, FormsModule],
  declarations: [LoginComponent]
})
export class AuthModule {}
