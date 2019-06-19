import { IAppState } from "../models/core/iAppState";
import { AnyAction } from "redux";
import { StateLoaderAction, StateLoaderActionTypes } from "./actions";

export function stateReducer(state: IAppState, action: AnyAction): IAppState {
	let result = { ...state };
	const loaderAction = action.type as StateLoaderAction;

	if (loaderAction) {
		switch (loaderAction.argument) {
			case StateLoaderActionTypes.APP_LOADED:
				result = appLoaded(state, action.state);
				break;

			case StateLoaderActionTypes.STATE_LOADED:
				result = stateLoaded(action.state);
				break;
		}
	}

	return result;
}

function appLoaded(oldState: IAppState, newState: IAppState): IAppState {
	return {
		user: oldState.user,
		app: newState.app
	};
}

function stateLoaded(newState: IAppState): IAppState {
	return { ...newState };
}
