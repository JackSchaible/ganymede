import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavComponent } from "./main/nav/nav.component";
import { HomeComponent } from "./main/home/home.component";
import { CrCalculatorComponent } from "./main/cr-calculator/cr-calculator.component";
import { RouteNotFoundComponent } from "./main/route-not-found/route-not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationMessageComponent } from './forms/validation-message/validation-message.component';

const routes = [
  { path: "", component: HomeComponent },
  { path: "CRCalculator", component: CrCalculatorComponent },
  { path: "**", component: RouteNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CrCalculatorComponent,
    RouteNotFoundComponent,
    ValidationMessageComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
