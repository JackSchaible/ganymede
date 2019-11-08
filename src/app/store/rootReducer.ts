import { AnyAction } from "redux";
import { authReducer } from "../auth/store/reducers";
import { AuthAction } from "../auth/store/actions";
import { IAppState } from "../models/core/iAppState";
import { StateLoaderAction } from "./actions";
import { stateReducer } from "./reducers";
import { CampaignAction } from "../campaign/store/actions";
import { campaignReducer } from "../campaign/store/reducers";
import { SpellAction } from "../campaign/modules/spell/store/actions";
import { spellReducer } from "../campaign/modules/spell/store/reducers";
import { MonsterAction } from "../campaign/modules/monster/store/actions";
import { MonsterReducer } from "../campaign/modules/monster/store/reducers";

export function reduce(appState: IAppState, action: AnyAction): IAppState {
	let state = { ...appState };

	if (action.type instanceof AuthAction)
		state = authReducer(appState, action);
	else if (action.type instanceof StateLoaderAction)
		state = stateReducer(appState, action);
	else if (action.type instanceof CampaignAction)
		state = campaignReducer(appState, action);
	else if (action.type instanceof SpellAction)
		state = spellReducer(appState, action);
	else if (action.type instanceof MonsterAction)
		state = MonsterReducer(appState, action);

	return state;
}
