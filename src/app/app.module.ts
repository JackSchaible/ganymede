import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavComponent } from "./main/nav/nav.component";
import { HomeComponent } from "./main/home/home.component";
import { CrCalculatorComponent } from "./main/cr-calculator/cr-calculator.component";
import { RouteNotFoundComponent } from "./main/route-not-found/route-not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EncounterModule } from "./encounter/encounter.module";
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "./forms/forms.module";
import { MatToolbarModule, MatMenuModule } from "@angular/material";
import { DeviceDetectorModule } from "ngx-device-detector";
import { NavItemComponent } from "./main/nav-item/nav-item.component";
import { CampaignModule } from "./campaign/campaign.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { StateLoaderService } from "./services/stateLoader.service";

import { NgRedux, DevToolsExtension } from "@angular-redux/store";
import {
	composeReducers,
	defaultFormReducer,
	provideReduxForms
} from "@angular-redux/form";
import { compose, combineReducers, Middleware } from "redux";
import { IAppState } from "./models/core/IAppState";

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

		AppRoutingModule,
		DeviceDetectorModule.forRoot()
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		StateLoaderService
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
			combineReducers({
				// replace with real reducers, when needed
				user: (appState, action) => {
					return { ...appState };
				}
			})
		);

		const initialState: IAppState = this.stateService.loadState();
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

		store.configureStore(reducers, initialState, middleware, [
			compose(...enhancers)
		]);

		store.subscribe(() => {
			const state = store.getState();

			this.stateService.saveState({
				user: state.user
			});
		});

		provideReduxForms(store);
	}
}
