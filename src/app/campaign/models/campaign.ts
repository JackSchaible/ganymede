import { Ruleset } from "../../models/core/rulesets/ruleset";
import { Spell } from "../modules/spell/models/spell";
import { AppUser } from "../../models/core/appUser";

export class Campaign {
	public id: number;
	public name: number;
	public description: number;

	public rulesetID: number;
	public ruleset: Ruleset;

	public appUserID: string;
	public user: AppUser;

	public monsters: any[];
	public spells: Spell[];

	public static getDefault(): Campaign {
		const campaign = new Campaign();
		campaign.id = -1;

		return campaign;
	}

	public static isEqual(a: Campaign, b: Campaign): boolean {
		return (
			a.id === b.id &&
			a.name === b.name &&
			a.description === b.description &&
			a.rulesetID === b.rulesetID &&
			a.appUserID === b.appUserID
		);
	}
}
