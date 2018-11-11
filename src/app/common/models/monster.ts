import basicInfo from "./monster/basicInfo";
import stats from "./monster/stats/stats";
import features from "./monster/features/features";
import traits from "./monster/traits/traits";
import description from "./monster/description";
import alignment from "./monster/alignment";
import armorClass from "./monster/stats/armorClass";
import dice from "./generic/dice";
import languages from "./monster/features/languages";
import { spells } from "./monster/traits/spells/spells";

export default class monster {
	constructor(
		public BasicInfo: basicInfo,
		public Stats: stats,
		public Features: features,
		public Traits: traits,
		public Actions: description[],
		public LegendaryActionsDescription: string,
		public LegendaryActions: description[]
	) {}

	static makeDefault(): monster {
		return new monster(
			new basicInfo(
				"Unnamed",
				0,
				"Unknown",
				[],
				alignment.default(),
				"Medium",
				2
			),
			new stats(
				10,
				10,
				10,
				10,
				10,
				10,
				0,
				0,
				[],
				armorClass.default(),
				0,
				dice.default(),
				""
			),
			new features(
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				new languages([], false, 0),
				[],
				0
			),
			new traits([], new spells()),
			[],
			null,
			[]
		);
	}

	static newMonster(): monster {
		return new monster(
			new basicInfo("", 0, "", [], alignment.default(), "", 0),
			new stats(
				10,
				10,
				10,
				10,
				10,
				10,
				0,
				30,
				[],
				armorClass.default(),
				0,
				new dice(1, 4),
				""
			),
			new features(
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				new languages([], false, 0),
				[],
				0
			),
			new traits([], new spells()),
			[],
			null,
			[]
		);
	}
}
