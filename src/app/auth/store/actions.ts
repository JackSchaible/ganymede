import { AppUser } from "src/app/models/core/AppUser";
import { Injectable } from "@angular/core";
import { StateLoaderService } from "src/app/services/stateLoader.service";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/IAppState";

export class ActionTypes {
	public static LOGGED_IN: string = "LOGGED_IN";
	public static LOGGED_OUT: string = "LOGGED_OUT";
}

export class AuthAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class AuthActions {
	constructor(private stateService: StateLoaderService) {}

	public loggedIn(user: AppUser): AnyAction {
		this.stateService.saveState({ user: user });
		const state: IAppState = {
			user: user
		};
		return { type: new AuthAction(ActionTypes.LOGGED_IN), state: state };
	}

	public loggedOut(): AnyAction {
		this.stateService.saveState({ user: null });
		const state: IAppState = {
			user: null
		};
		return { type: new AuthAction(ActionTypes.LOGGED_OUT), state: state };
	}
}
