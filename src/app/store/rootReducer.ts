import { AnyAction } from "redux";
import { authReducer } from "../auth/store/reducers";
import { AuthAction } from "../auth/store/actions";
import { IAppState } from "../models/core/IAppState";

export function reduce(appState: IAppState, action: AnyAction): IAppState {
	let state = { ...appState };

	if (action.type instanceof AuthAction) state = authReducer(appState, action);

	return state;
}
