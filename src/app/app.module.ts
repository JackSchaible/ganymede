import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavComponent } from "./main/nav/nav.component";
import { HomeComponent } from "./main/home/home.component";
import { CrCalculatorComponent } from "./main/cr-calculator/cr-calculator.component";
import { RouteNotFoundComponent } from "./main/route-not-found/route-not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { EncounterModule } from "./encounter/encounter.module";
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "./forms/forms.module";
import { IsLoggedInDirective } from './directives/is-logged-in.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CrCalculatorComponent,
    RouteNotFoundComponent,
    IsLoggedInDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    EncounterModule,
    AuthModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
