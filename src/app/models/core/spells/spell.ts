import { MonsterSpell } from "./monsterSpell";
import { CastingTime } from "./castingTime";
import { Campaign } from "../campaign";
import { SpellComponents } from "./spellComponents";
import { SpellDuration } from "./spellDuration";
import { SpellSchool } from "./spellSchool";
import { SpellRange } from "./spellRange";

export class Spell {
	public id: number;
	public name: string;
	public level: number;
	public ritual: boolean;
	public description: string;
	public atHigherLevels: string;

	public spellSchoolId: number;
	public spellSchool: SpellSchool;

	public castingTimeId: number;
	public castingTime: CastingTime;

	public spellRangeId: number;
	public spellRange: SpellRange;

	public spellComponentsID: number;
	public spellComponents: SpellComponents;

	public spellDurationId: number;
	public spellDuration: SpellDuration;

	public campaignID: number;
	public campaign: Campaign;

	public monsterSpells: MonsterSpell[];

	public static getDefault() {
		const spell = new Spell();
		spell.id = -1;

		return spell;
	}
}
