import { Injectable } from "@angular/core";
import { StateLoaderService } from "src/app/services/stateLoader.service";
import { AnyAction } from "redux";
import { IAppState } from "src/app/models/core/IAppState";
import { Campaign } from "src/app/models/core/campaign";

export class CampaignActionTypes {
	public static CAMPAIGN_SELECTED: string = "CAMPAIGN_SELECTED";
}

export class CampaignAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class CampaignActions {
	constructor(private stateService: StateLoaderService) {}

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
}
