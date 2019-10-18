import { IAppState } from "src/app/models/core/iAppState";
import { AnyAction } from "redux";
import { CampaignAction, CampaignActionTypes } from "./actions";
import { Campaign } from "src/app/campaign/models/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";
import * as _ from "lodash";

export function campaignReducer(
	state: IAppState,
	action: AnyAction
): IAppState {
	let result = _.cloneDeep(state);
	const campaignAction = action.type as CampaignAction;

	if (campaignAction) {
		switch (campaignAction.argument) {
			case CampaignActionTypes.CAMPAIGN_SELECTED:
				result = campaignSelectedReducer(state, action.state);
				break;

			case CampaignActionTypes.CAMPAIGN_DESELECTED:
				result = campaignDeselectedReducer(state, action.state);
				break;

			case CampaignActionTypes.CAMPAIGN_EDIT:
				result = campaignEditReducer(state, action.state);
				break;

			case CampaignActionTypes.CAMPAIGN_EDIT_FORM_CHANGED:
				result = campaignFormChangedReducer(state, action.state);
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
	const state = _.cloneDeep(oldState);
	const index = state.user.campaigns.findIndex((c: Campaign) => {
		return c.id === newState.app.campaign.id;
	});

	state.user.campaigns[index] = newState.app.campaign;
	state.app.campaign = newState.app.campaign;

	return state;
}

function campaignDeselectedReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);

	state.app.campaign = null;

	return state;
}

function campaignEditReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);
	const campaignId = newState.app.forms.campaignForm.id;

	let campaign: Campaign;
	if (campaignId >= 0)
		campaign = oldState.user.campaigns.find(c => c.id === campaignId);
	else campaign = Campaign.getDefault();

	state.app.forms.campaignForm = campaign;

	return state;
}

function campaignFormChangedReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);

	state.app.forms.campaignForm = newState.app.forms.campaignForm;

	if (
		state.app.forms.campaignForm.ruleset &&
		(state.app.forms.campaignForm.ruleset.id ||
			state.app.forms.campaignForm.ruleset.id === 0)
	)
		state.app.forms.campaignForm.ruleset = state.app.forms.campaignFormData.rulesets.find(
			(r: Ruleset) => {
				return r.id === state.app.forms.campaignForm.ruleset.id;
			}
		);

	return state;
}

function campaignSaved(
	oldState: IAppState,
	newState: IAppState,
	isNew: boolean
): IAppState {
	const state = _.cloneDeep(oldState);

	const newCampaign = newState.app.forms.campaignForm;
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
	const state = _.cloneDeep(oldState);

	const id = newState.app.forms.campaignForm.id;
	const index = state.user.campaigns.findIndex((campaign: Campaign) => {
		return campaign.id === id;
	});

	state.user.campaigns.splice(index, 1);

	return state;
}
