import { Campaign } from "../campaign";

export class Forms {
	public campaignForm: Campaign;

	public static getDefault(): Forms {
		return {
			campaignForm: Campaign.getDefault()
		};
	}
}
