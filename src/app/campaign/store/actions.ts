import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/iAppState";
import { Campaign } from "src/app/models/core/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";

export class CampaignActionTypes {
	public static CAMPAIGN_SELECTED: string = "CAMPAIGN_SELECTED";
	public static CAMPAIGN_DESELECTED: string = "CAMPAIGN_DESELECTED";
	public static CAMPAIGN_EDIT: string = "CAMPAIGN_EDIT";
	public static CAMPAIGN_EDIT_RULESET_CHANGED: string =
		"CAMPAIGN_EDIT_RULESET_CHANGED";
	public static NEW_CAMPAIGN_SAVED: string = "NEW_CAMPAIGN_SAVED";
	public static CAMPAIGN_SAVED: string = "CAMPAIGN_SAVED";
	public static CAMPAIGN_DELETED: string = "CAMPAIGN_DELETED";
}

export class CampaignAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class CampaignActions {
	public selectCampaign(campaign: Campaign): AnyAction {
		const state: IAppState = {
			user: undefined,
			app: {
				campaign: campaign,
				forms: undefined,
				rulesets: undefined
			}
		};
		return {
			type: new CampaignAction(CampaignActionTypes.CAMPAIGN_SELECTED),
			state: state
		};
	}

	public deselectCampaign(): AnyAction {
		return {
			type: new CampaignAction(CampaignActionTypes.CAMPAIGN_DESELECTED)
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
				},
				campaign: undefined
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
				},
				campaign: undefined
			}
		};
		return {
			type: new CampaignAction(
				CampaignActionTypes.CAMPAIGN_EDIT_RULESET_CHANGED
			),
			state: state
		};
	}

	public saveCampaign(campaign: Campaign, isNew: boolean): AnyAction {
		const state: IAppState = {
			user: {
				campaigns: [campaign],
				email: undefined
			},
			app: {
				rulesets: undefined,
				forms: {
					campaignForm: campaign
				},
				campaign: undefined
			}
		};

		let actionType: string = CampaignActionTypes.CAMPAIGN_SAVED;

		if (isNew) actionType = CampaignActionTypes.NEW_CAMPAIGN_SAVED;

		return {
			type: new CampaignAction(actionType),
			state: state
		};
	}

	public deleteCampaign(id: number): AnyAction {
		const campaign: Campaign = Campaign.getDefault();
		campaign.id = id;

		const state: IAppState = {
			user: undefined,
			app: {
				rulesets: undefined,
				forms: {
					campaignForm: campaign
				},
				campaign: undefined
			}
		};

		return {
			type: new CampaignAction(CampaignActionTypes.CAMPAIGN_DELETED),
			state: state
		};
	}
}
