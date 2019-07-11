import { Ruleset } from "./rulesets/ruleset";

export class Campaign {
	public id: number;
	public name: number;
	public description: number;
	public rulesetID: number;
	public ruleset: Ruleset;

	static getDefault(): Campaign {
		return {
			id: -1,
			name: undefined,
			description: undefined,
			rulesetID: undefined,
			ruleset: undefined
		};
	}
}
