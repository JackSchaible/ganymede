import Description from "./description";
import Stats from "./stats/stats";
import BasicInfo from "./basicInfo";
import ExtraInfo from "./extraInfo";
import Alignment from "./alignment";
import Dice from "./generic/dice";
import ArmorClass from "./stats/armorClass";

export default class Monster {
	constructor(
		public BasicInfo: BasicInfo,
		public Stats: Stats,
		public ExtraInfo: ExtraInfo,
		public Features: Description[],
		public Actions: Description[],
		public LegendaryActionsDescription: string,
		public LegendaryActions: Description[]
	) {}

	static MakeDefault(): Monster {
		return new Monster(
			new BasicInfo("Unnamed", 0, "Unknown", [], Alignment.Default(), "Medium"),
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
			new ExtraInfo(0, "passive Perception 10", []),
			[],
			[],
			null,
			[]
		);
	}

	static New(): Monster {
		return new Monster(
			new BasicInfo("", 0, "", [], Alignment.Default(), ""),
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
			new ExtraInfo(0, "", []),
			[],
			[],
			null,
			[]
		);
	}
}
