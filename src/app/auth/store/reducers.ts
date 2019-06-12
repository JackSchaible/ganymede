import { AuthActionTypes, AuthAction } from "./actions";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/IAppState";

export function authReducer(state: IAppState, action: AnyAction): IAppState {
	let result = { ...state };
	const authAction = action.type as AuthAction;

	if (authAction) {
		switch (authAction.argument) {
			case AuthActionTypes.LOGGED_IN:
				result = loginChanged(action.state);
				break;

			case AuthActionTypes.LOGGED_OUT:
				result = loginChanged(action.state);
				break;
		}
	}

	return result;
}

function loginChanged(state: IAppState): IAppState {
	return { user: state.user };
}
