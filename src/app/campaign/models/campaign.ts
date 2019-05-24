import { Ruleset } from "./ruleset";

export class Campaign {
	public id: number;
	public name: string;
	public description: string;
	public ruleset: Ruleset;

	constructor() {
		this.id = this.name = this.description = null;
		this.ruleset = new Ruleset();
	}
}
