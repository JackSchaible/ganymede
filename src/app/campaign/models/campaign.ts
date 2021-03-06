import { Ruleset } from "../../models/core/rulesets/ruleset";
import { Spell } from "../modules/spell/models/spell";
import IFormEditable from "src/app/models/core/app/forms/iFormEditable";

export class Campaign implements IFormEditable {
	public id: number;
	public name: string;
	public description: number;
	public ruleset: Ruleset;
	public user: string;

	public monsters: any[];
	public spells: Spell[];

	public static getDefault(): Campaign {
		const campaign = new Campaign();
		campaign.id = -1;
		campaign.user = undefined;

		campaign.ruleset = Ruleset.getDefault();
		campaign.monsters = [];
		campaign.spells = [];

		return campaign;
	}

	public static isEqual(a: Campaign, b: Campaign): boolean {
		return (
			a.id === b.id &&
			a.name === b.name &&
			a.description === b.description
		);
	}
}
