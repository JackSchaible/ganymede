import { AnyAction } from "redux";
import { authReducer } from "../auth/store/reducers";
import { AuthAction } from "../auth/store/actions";
import { IAppState } from "../models/core/IAppState";
import { StateLoaderAction } from "./actions";
import { stateReducer } from "./reducers";

export function reduce(appState: IAppState, action: AnyAction): IAppState {
	let state = { ...appState };

	if (action.type instanceof AuthAction) state = authReducer(appState, action);
	else if (action.type instanceof StateLoaderAction)
		state = stateReducer(appState, action);
	return state;
}
