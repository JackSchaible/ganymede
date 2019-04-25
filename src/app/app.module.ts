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
import { MatToolbarModule, MatMenuModule } from "@angular/material";
import { DeviceDetectorModule } from "ngx-device-detector";
import { SpellsModule } from "./spells/spells.module";
import { NavItemComponent } from "./main/nav-item/nav-item.component";

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HomeComponent,
		CrCalculatorComponent,
		RouteNotFoundComponent,
		NavItemComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		EncounterModule,
		SpellsModule,
		AuthModule,
		AppRoutingModule,
		FormsModule,
		MatToolbarModule,
		MatMenuModule,
		DeviceDetectorModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
