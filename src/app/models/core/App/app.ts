import { Forms } from "./forms";
import { Ruleset } from "../rulesets/ruleset";

export class App {
	public rulesets: Ruleset[];
	public forms: Forms;

	public static getDefault(): App {
		return {
			rulesets: [],
			forms: Forms.getDefault()
		};
	}
}
