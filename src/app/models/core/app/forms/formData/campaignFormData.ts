import { Ruleset } from "../../../rulesets/ruleset";

export class CampaignFormData {
	public rulesets: Ruleset[];

	static getDefault(): CampaignFormData {
		return {
			rulesets: []
		};
	}
}
