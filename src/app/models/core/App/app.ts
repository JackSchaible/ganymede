import { Ruleset } from "../Rulesets/Ruleset";

export class App {
	public rulesets: Ruleset[];

	public static getDefault(): App {
		return {
			rulesets: []
		};
	}
}
