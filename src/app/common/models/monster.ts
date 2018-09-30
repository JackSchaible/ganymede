import Description from "./description";
import Stats from "./stats/stats";
import BasicInfo from "./basicInfo";
import Alignment from "./alignment";
import Dice from "./generic/dice";
import ArmorClass from "./stats/armorClass";
import Features from "./features/features";
import Languages from "./features/languages";

export default class Monster {
	constructor(
		public BasicInfo: BasicInfo,
		public Stats: Stats,
		public Features: Features,
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
			[],
			null,
			[]
		);
	}
}
