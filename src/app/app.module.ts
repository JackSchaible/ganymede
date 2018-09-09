import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavComponent } from "./main/nav/nav.component";
import { HomeComponent } from "./main/home/home.component";
import { CrCalculatorComponent } from "./main/cr-calculator/cr-calculator.component";
import { RouteNotFoundComponent } from "./main/route-not-found/route-not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationMessageComponent } from "./forms/validation-message/validation-message.component";
import { AppRoutingModule } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CrCalculatorComponent,
    RouteNotFoundComponent,
    ValidationMessageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
