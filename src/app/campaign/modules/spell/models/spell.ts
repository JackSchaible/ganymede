import { MonsterSpell } from "./monsterSpell";
import { CastingTime } from "./castingTime";
import { Campaign } from "../../../models/campaign";
import { SpellComponents } from "./spellComponents";
import { SpellDuration } from "./spellDuration";
import { SpellSchool } from "./spellSchool";
import { SpellRange } from "./spellRange";
import IFormEditable from "src/app/models/core/app/forms/iFormEditable";

export class Spell implements IFormEditable {
	public id: number;
	public name: string;
	public level: number;
	public ritual: boolean;
	public description: string;
	public atHigherLevels: string;

	public spellSchoolID: number;
	public spellSchool: SpellSchool;

	public castingTimeID: number;
	public castingTime: CastingTime;

	public spellRangeID: number;
	public spellRange: SpellRange;

	public spellComponentsID: number;
	public spellComponents: SpellComponents;

	public spellDurationID: number;
	public spellDuration: SpellDuration;

	public campaignID: number;
	public campaign: Campaign;

	public monsterSpells: MonsterSpell[];

	public static getDefault() {
		const spell = new Spell();

		spell.id = -1;
		spell.castingTime = CastingTime.getDefault();
		spell.spellRange = SpellRange.getDefault();
		spell.spellComponents = SpellComponents.getDefault();
		spell.spellDuration = SpellDuration.getDefault();

		return spell;
	}

	public static isEqual(a: Spell, b: Spell): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.atHigherLevels === b.atHigherLevels &&
				a.campaignID === b.campaignID &&
				CastingTime.isEqual(a.castingTime, b.castingTime) &&
				a.description === b.description &&
				a.id === b.id &&
				a.level === b.level &&
				a.name === b.name &&
				a.ritual === b.ritual &&
				SpellComponents.isEqual(a.spellComponents, b.spellComponents) &&
				SpellDuration.isEqual(a.spellDuration, b.spellDuration) &&
				SpellRange.isEqual(a.spellRange, b.spellRange) &&
				SpellSchool.isEqual(a.spellSchool, b.spellSchool))
		);
	}
}
