import { Campaign } from "../../campaign";
import { Spell } from "../../spells/spell";
import { CampaignFormData } from "./formData/campaignFormData";
import { SpellFormData } from "./formData/spellFormData";

export class Forms {
	public campaignForm: Campaign;
	public campaignFormData: CampaignFormData;
	public spellForm: Spell;
	public spellFormData: SpellFormData;

	public static getDefault(): Forms {
		return {
			campaignForm: Campaign.getDefault(),
			campaignFormData: CampaignFormData.getDefault(),
			spellForm: Spell.getDefault(),
			spellFormData: SpellFormData.getDefault()
		};
	}
}
