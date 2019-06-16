import { AuthActionTypes, AuthAction } from "./actions";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/IAppState";

export function authReducer(state: IAppState, action: AnyAction): IAppState {
	let result = { ...state };
	const authAction = action.type as AuthAction;

	if (authAction) {
		switch (authAction.argument) {
			case AuthActionTypes.LOGGED_IN:
				result = loginChanged(state, action.state);
				break;

			case AuthActionTypes.LOGGED_OUT:
				result = loginChanged(state, action.state);
				break;
		}
	}

	return result;
}

function loginChanged(oldState: IAppState, newState: IAppState): IAppState {
	return { user: newState.user, app: oldState.app };
}
