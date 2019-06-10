import { Action } from "@ngrx/store";
import { AppUser } from "../../models/core/AppUser";

export const LOGGED_IN = "LOGGED_IN";

export interface ILoggedInAction extends Action {
	payload: { value: AppUser };
}

export function loggedIn(value: AppUser): ILoggedInAction {
	return {
		type: LOGGED_IN,
		payload: { value }
	};
}
