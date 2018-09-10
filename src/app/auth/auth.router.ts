import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
