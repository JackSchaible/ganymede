import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavComponent } from "./main/nav/nav.component";
import { HomeComponent } from "./main/home/home.component";
import { CrCalculatorComponent } from "./main/cr-calculator/cr-calculator.component";
import { RouteNotFoundComponent } from "./main/route-not-found/route-not-found.component";
import { NavItemComponent } from "./main/nav-item/nav-item.component";

import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EncounterModule } from "./encounter/encounter.module";
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "./forms/forms.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CampaignModule } from "./campaign/campaign.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";

import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";

import { StateLoaderService } from "./services/stateLoader.service";

import {
	NgRedux,
	DevToolsExtension,
	NgReduxModule
} from "@angular-redux/store";
import {
	composeReducers,
	defaultFormReducer,
	provideReduxForms
} from "@angular-redux/form";
import { compose, Middleware } from "redux";
import { reduce } from "./store/rootReducer";

import { IAppState } from "./models/core/iAppState";
import { AppUser } from "./models/core/appUser";
import { App } from "./models/core/app/app";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

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
		BrowserAnimationsModule,
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		MatToolbarModule,
		MatMenuModule,

		EncounterModule,
		AuthModule,
		CampaignModule,

		NgReduxModule,

		AppRoutingModule,
		LayoutModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		StateLoaderService,
		{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(
		public store: NgRedux<IAppState>,
		private devTools: DevToolsExtension,
		private stateService: StateLoaderService
	) {
		const reducers = composeReducers<IAppState>(
			defaultFormReducer(),
			reduce
		);

		const middleware: Middleware[] = [];

		const enhancers: any = [];
		if (devTools.isEnabled()) {
			enhancers.push(
				devTools.enhancer({
					latency: 1000,
					maxAge: 10
				})
			);
		}

		const state: IAppState = {
			user: AppUser.getDefault(),
			app: App.getDefault()
		};

		store.configureStore(reducers, state, middleware, [
			compose(...enhancers)
		]);

		store.subscribe(() => {
			const newState = store.getState();

			this.stateService.saveState({
				user: newState.user,
				app: newState.app
			});
		});

		provideReduxForms(store);

		stateService.loadState(store);
	}
}
