import { IAppState } from "src/app/models/core/iAppState";
import { AnyAction } from "redux";
import { CampaignAction, CampaignActionTypes } from "./actions";
import { Campaign } from "src/app/models/core/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";

export function campaignReducer(
	state: IAppState,
	action: AnyAction
): IAppState {
	let result = { ...state };
	const campaignAction = action.type as CampaignAction;

	if (campaignAction) {
		switch (campaignAction.argument) {
			case CampaignActionTypes.CAMPAIGN_EDIT:
				result = campaignEditReducer(state, action.state);
				break;

			case CampaignActionTypes.CAMPAIGN_EDIT_RULESET_CHANGED:
				result = campaignEditRulesetChangedReducer(state, action.state);
				break;
		}
	}

	return result;
}

function campaignEditReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = { ...oldState };
	const campaignId = newState.app.forms.campaignForm.id;

	let campaign: Campaign;
	if (campaignId >= 0)
		campaign = oldState.user.campaigns.find(c => c.id === campaignId);
	else campaign = Campaign.getDefault();

	state.app.forms.campaignForm = campaign;

	return state;
}

function campaignEditRulesetChangedReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = { ...oldState };
	const rulesetID: number = newState.app.forms.campaignForm.ruleset.id;
	const ruleset: Ruleset = oldState.app.rulesets.find((r: Ruleset) => {
		return r.id === rulesetID;
	});

	state.app.forms.campaignForm.rulesetID = rulesetID;
	state.app.forms.campaignForm.ruleset = { ...ruleset };

	return state;
}
