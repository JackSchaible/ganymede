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
			case CampaignActionTypes.CAMPAIGN_SELECTED:
				result = campaignSelectedReducer(state, action.state);
				break;

			case CampaignActionTypes.CAMPAIGN_EDIT:
				result = campaignEditReducer(state, action.state);
				break;

			case CampaignActionTypes.CAMPAIGN_EDIT_RULESET_CHANGED:
				result = campaignEditRulesetChangedReducer(state, action.state);
				break;

			case CampaignActionTypes.NEW_CAMPAIGN_SAVED:
				result = campaignSaved(state, action.state, true);
				break;

			case CampaignActionTypes.CAMPAIGN_SAVED:
				result = campaignSaved(state, action.state, false);
				break;

			case CampaignActionTypes.CAMPAIGN_DELETED:
				result = campaignDeleted(state, action.state);
				break;
		}
	}

	return result;
}

function campaignSelectedReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = { ...oldState };
	const campaign = state.user.campaigns.find((c: Campaign) => {
		return c.id === newState.app.campaign.id;
	});

	state.app.campaign = campaign;

	return state;
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

function campaignSaved(
	oldState: IAppState,
	newState: IAppState,
	isNew: boolean
): IAppState {
	const state = { ...oldState };

	const newCampaign = newState.user.campaigns[0];
	state.app.forms.campaignForm = newState.app.forms.campaignForm;

	if (isNew) state.user.campaigns.push(newCampaign);
	else {
		const index = state.user.campaigns.findIndex((campaign: Campaign) => {
			return campaign.id === newCampaign.id;
		});

		state.user.campaigns[index] = newCampaign;
	}

	return state;
}

function campaignDeleted(oldState: IAppState, newState: IAppState): IAppState {
	const state = { ...oldState };

	const id = newState.app.forms.campaignForm.id;
	const index = state.user.campaigns.findIndex((campaign: Campaign) => {
		return campaign.id === id;
	});

	state.user.campaigns.splice(index, 1);

	return state;
}