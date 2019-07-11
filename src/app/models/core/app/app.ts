import { Forms } from "./forms";
import { Ruleset } from "../Rulesets/ruleset";
import { Campaign } from "../campaign";

export class App {
	public rulesets: Ruleset[];
	public forms: Forms;
	public campaign: Campaign;

	public static getDefault(): App {
		return {
			rulesets: [],
			forms: Forms.getDefault(),
			campaign: Campaign.getDefault()
		};
	}
}
