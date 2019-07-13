import { Ruleset } from "./rulesets/ruleset";
import { Spell } from "./spells/spell";
import { AppUser } from "./appUser";

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

	static getDefault(): Campaign {
		const campaign = new Campaign();
		campaign.id = -1;

		return campaign;
	}
}
