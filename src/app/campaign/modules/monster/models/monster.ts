import IFormEditable from "src/app/models/core/app/forms/iFormEditable";
import { MonsterSize } from "./monsterEnums";
import { MonsterType } from "./monsterType";
import { Tag } from "src/app/models/core/tag";
import { Alignment } from "./alignment";
import { BasicStats } from "./basicStats/basicStats";
import { AbilityScores } from "./abilityScores";
import { OptionalStatsSet } from "./optionalStats/optionalStatsSet";
import { SpecialTraitSet } from "./specialTraits/specialTraitSet";
import { LegendaryActionSet } from "./actions/legendaryActionSet";
import { ActionSet } from "./actions/actionSet";
import { Equipment } from "src/app/equipment/models/equipment";

export class Monster implements IFormEditable {
	public id: number;
	public name: string;
	public size: MonsterSize;
	public type: MonsterType;

	public tags: Tag[];
	public alignments: Alignment[];

	public basicStats: BasicStats;
	public abilityScores: AbilityScores;
	public optionalStats: OptionalStatsSet;
	public specialTraits: SpecialTraitSet;
	public actions: ActionSet;
	public equipment: Equipment[];
	public legendaryActions: LegendaryActionSet;

	public static getDefault(): Monster {
		const monster = new Monster();

		monster.id = -1;
		monster.type = MonsterType.getDefault();
		monster.basicStats = BasicStats.getDefault();
		monster.abilityScores = AbilityScores.getDefault();
		monster.optionalStats = OptionalStatsSet.getDefault();
		monster.specialTraits = SpecialTraitSet.getDefault();
		monster.actions = ActionSet.getDefault();
		monster.equipment = [];
		monster.legendaryActions = LegendaryActionSet.getDefault();

		return monster;
	}

	public static isEqual(a: Monster, b: Monster): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.id === b.id &&
				a.name === b.name &&
				MonsterType.isEqual(a.type, b.type) &&
				Tag.areEqual(a.tags, b.tags) &&
				Alignment.areEqual(a.alignments, b.alignments) &&
				BasicStats.isEqual(a.basicStats, b.basicStats) &&
				AbilityScores.isEqual(a.abilityScores, b.abilityScores) &&
				OptionalStatsSet.isEqual(a.optionalStats, b.optionalStats) &&
				SpecialTraitSet.isEqual(a.specialTraits, b.specialTraits) &&
				ActionSet.isEqual(a.actions, b.actions) &&
				Equipment.areEqual(a.equipment, b.equipment) &&
				LegendaryActionSet.isEqual(
					a.legendaryActions,
					b.legendaryActions
				))
		);
	}
}
