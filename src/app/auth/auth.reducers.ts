import { AppUser, getDefaultState } from "../models/core/AppUser";
import { Action, ActionReducerMap } from "@ngrx/store";
import { LOGGED_IN, ILoggedInAction } from "./auth.actions";

export const reducers: ActionReducerMap<AppUser> = getDefaultState();

export function userReducer(action: Action): AppUser {
	switch (action.type) {
		case LOGGED_IN:
			const typedAction = <ILoggedInAction>action;
			return { ...typedAction.payload.value };
	}
}
