import { Campaign } from "../../../../campaign/models/campaign";
import { Spell } from "../../../../campaign/modules/spell/models/spell";
import { CampaignFormData } from "./formData/campaignFormData";
import { SpellFormData } from "./formData/spellFormData";
import { Monster } from "src/app/campaign/modules/monster/models/monster";
import MonsterFormData from "./formData/monsterFormData";

export class Forms {
	public campaignForm: Campaign;
	public campaignFormData: CampaignFormData;
	public spellForm: Spell;
	public spellFormData: SpellFormData;
	public monsterForm: Monster;
	public monsterFormData: MonsterFormData;

	public static getDefault(): Forms {
		return {
			campaignForm: Campaign.getDefault(),
			campaignFormData: CampaignFormData.getDefault(),
			spellForm: Spell.getDefault(),
			spellFormData: SpellFormData.getDefault(),
			monsterForm: Monster.getDefault(),
			monsterFormData: MonsterFormData.getDefault()
		};
	}
}
