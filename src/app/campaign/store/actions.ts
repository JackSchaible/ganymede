import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/iAppState";
import { Campaign } from "src/app/models/core/campaign";
import { Ruleset } from "src/app/models/core/rulesets/ruleset";
import { App } from "src/app/models/core/app/app";
import { AppUser } from "src/app/models/core/appUser";

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
		const app = App.getDefault();
		app.campaign = campaign;

		const state: IAppState = {
			user: undefined,
			app: app
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

		const app = App.getDefault();
		app.forms.campaignForm = campaignForm;

		const state: IAppState = {
			user: null,
			app: app
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

		const app = App.getDefault();
		app.forms.campaignForm = campaignForm;

		const state: IAppState = {
			user: undefined,
			app: app
		};
		return {
			type: new CampaignAction(
				CampaignActionTypes.CAMPAIGN_EDIT_RULESET_CHANGED
			),
			state: state
		};
	}

	public saveCampaign(campaign: Campaign, isNew: boolean): AnyAction {
		const user = AppUser.getDefault();
		user.campaigns = [campaign];

		const app = App.getDefault();
		app.forms.campaignForm = campaign;

		const state: IAppState = {
			user: user,
			app: app
		};

		let actionType: string = CampaignActionTypes.CAMPAIGN_SAVED;

		if (isNew) actionType = CampaignActionTypes.NEW_CAMPAIGN_SAVED;

		return {
			type: new CampaignAction(actionType),
			state: state
		};
	}

	public deleteCampaign(id: number): AnyAction {
		const app = App.getDefault();
		const campaign = Campaign.getDefault();
		campaign.id = id;
		app.forms.campaignForm = campaign;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new CampaignAction(CampaignActionTypes.CAMPAIGN_DELETED),
			state: state
		};
	}
}
