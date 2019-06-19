import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/iAppState";
import { Campaign } from "src/app/models/core/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";

export class CampaignActionTypes {
	public static CAMPAIGN_SELECTED: string = "CAMPAIGN_SELECTED";
	public static CAMPAIGN_EDIT: string = "CAMPAIGN_EDIT";
	public static CAMPAIGN_EDIT_RULESET_CHANGED: string =
		"CAMPAIGN_EDIT_RULESET_CHANGED";
}

export class CampaignAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class CampaignActions {
	public loadCampaign(campaign: Campaign): AnyAction {
		const state: IAppState = {
			user: {
				email: null,
				campaigns: [campaign]
			},
			app: null
		};
		return {
			type: new CampaignAction(CampaignActionTypes.CAMPAIGN_SELECTED),
			state: state
		};
	}

	public editCampaign(campaignId: number): AnyAction {
		const campaignForm: Campaign = Campaign.getDefault();
		campaignForm.id = campaignId;

		const state: IAppState = {
			user: null,
			app: {
				rulesets: null,
				forms: {
					campaignForm: campaignForm
				}
			}
		};
		return {
			type: new CampaignAction(CampaignActionTypes.CAMPAIGN_EDIT),
			state: state
		};
	}

	public editCampaignSetRuleset(rulesetId: number): AnyAction {
		const campaignForm: Campaign = Campaign.getDefault();
		campaignForm.ruleset = Ruleset.getDefault();
		campaignForm.ruleset.id = rulesetId;

		const state: IAppState = {
			user: undefined,
			app: {
				rulesets: undefined,
				forms: {
					campaignForm: campaignForm
				}
			}
		};
		return {
			type: new CampaignAction(
				CampaignActionTypes.CAMPAIGN_EDIT_RULESET_CHANGED
			),
			state: state
		};
	}
}
