import { AnyAction } from "redux";
import { AppUser } from "../models/core/AppUser";
import { Injectable } from "@angular/core";
import { App } from "../models/core/App/app";
import { IAppState } from "../models/core/IAppState";

export class StateLoaderActionTypes {
	public static APP_LOADED: string = "APP_LOADED";
	public static STATE_LOADED: string = "STATE_LOADED";
}

export class StateLoaderAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class StateLoaderActions {
	public loadApp(app: App): AnyAction {
		const state: IAppState = {
			user: AppUser.getDefault(),
			app: app
		};
		return {
			type: new StateLoaderAction(StateLoaderActionTypes.APP_LOADED),
			state: state
		};
	}

	public loadState(state: IAppState): AnyAction {
		return {
			type: new StateLoaderAction(StateLoaderActionTypes.STATE_LOADED),
			state: state
		};
	}
}
