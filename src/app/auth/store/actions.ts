import { AppUser } from "src/app/models/core/appUser";
import { Injectable } from "@angular/core";
import { StateLoaderService } from "src/app/services/stateLoader.service";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/iAppState";

export class AuthActionTypes {
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
	public loggedIn(user: AppUser): AnyAction {
		const state: IAppState = {
			user: user,
			app: null
		};
		return { type: new AuthAction(AuthActionTypes.LOGGED_IN), state: state };
	}

	public loggedOut(): AnyAction {
		const state: IAppState = {
			user: null,
			app: null
		};
		return { type: new AuthAction(AuthActionTypes.LOGGED_OUT), state: state };
	}
}
