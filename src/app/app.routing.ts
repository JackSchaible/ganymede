import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./main/home/home.component";
import { CrCalculatorComponent } from "./main/cr-calculator/cr-calculator.component";
import { RouteNotFoundComponent } from "./main/route-not-found/route-not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "CRCalculator", component: CrCalculatorComponent },
  { path: "**", component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
