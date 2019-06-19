import { AnyAction } from "redux";
import { authReducer } from "../auth/store/reducers";
import { AuthAction } from "../auth/store/actions";
import { IAppState } from "../models/core/iAppState";
import { StateLoaderAction } from "./actions";
import { stateReducer } from "./reducers";
import { CampaignAction } from "../campaign/store/actions";
import { campaignReducer } from "../campaign/store/reducers";

export function reduce(appState: IAppState, action: AnyAction): IAppState {
	let state = { ...appState };

	if (action.type instanceof AuthAction) state = authReducer(appState, action);
	else if (action.type instanceof StateLoaderAction)
		state = stateReducer(appState, action);
	else if (action.type instanceof CampaignAction)
		state = campaignReducer(appState, action);

	return state;
}
