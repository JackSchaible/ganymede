import { Campaign } from "../campaign";
import { Spell } from "../spells/spell";

export class Forms {
	public campaignForm: Campaign;
	public spellForm: Spell;

	public static getDefault(): Forms {
		return {
			campaignForm: Campaign.getDefault(),
			spellForm: Spell.getDefault()
		};
	}
}
