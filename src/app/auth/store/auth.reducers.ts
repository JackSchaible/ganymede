import { AppUser, getDefaultState } from "../../models/core/AppUser";
import { Action, ActionReducerMap, createReducer } from "@ngrx/store";
import { LOGGED_IN, ILoggedInAction } from "./auth.actions";

export const reducers: ActionReducerMap<State, any> = { user: userReducer };

export interface State {
	user: AppUser;
}

export const authReducer = createReducer(userReducer);
export function userReducer(user: AppUser, action: Action): AppUser {
	switch (action.type) {
		case LOGGED_IN:
			const typedAction = <ILoggedInAction>action;
			return { ...typedAction.payload.value };
	}
}
