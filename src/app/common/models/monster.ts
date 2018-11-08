import BasicInfo from "./monster/basicInfo";
import Stats from "./monster/stats/stats";
import Features from "./monster/features/features";
import Traits from "./monster/traits/traits";
import Description from "./monster/description";
import Alignment from "./monster/alignment";
import ArmorClass from "./monster/stats/armorClass";
import Dice from "./generic/dice";
import Languages from "./monster/features/languages";
import { Spells } from "./monster/traits/spells/spells";

export default class Monster {
	constructor(
		public BasicInfo: BasicInfo,
		public Stats: Stats,
		public Features: Features,
		public Traits: Traits,
		public Actions: Description[],
		public LegendaryActionsDescription: string,
		public LegendaryActions: Description[]
	) {}

	static MakeDefault(): Monster {
		return new Monster(
			new BasicInfo(
				"Unnamed",
				0,
				"Unknown",
				[],
				Alignment.Default(),
				"Medium",
				2
			),
			new Stats(
				10,
				10,
				10,
				10,
				10,
				10,
				0,
				0,
				[],
				ArmorClass.Default(),
				0,
				Dice.Default(),
				""
			),
			new Features(
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				new Languages([], false, 0),
				[],
				0
			),
			new Traits([], new Spells()),
			[],
			null,
			[]
		);
	}

	static New(): Monster {
		return new Monster(
			new BasicInfo("", 0, "", [], Alignment.Default(), "", 0),
			new Stats(
				10,
				10,
				10,
				10,
				10,
				10,
				0,
				30,
				[],
				ArmorClass.Default(),
				0,
				new Dice(1, 4),
				""
			),
			new Features(
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				new Languages([], false, 0),
				[],
				0
			),
			new Traits([], new Spells()),
			[],
			null,
			[]
		);
	}
}
