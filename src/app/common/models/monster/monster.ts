import description from "./description";
import stats from "./stats/stats";
import basicInfo from "./basicInfo";
import alignment from "./alignment";
import dice from "../generic/dice";
import armorClass from "./stats/armorClass";
import features from "./features/features";
import languages from "./features/languages";
import traits from "./traits/traits";
import { spells } from "./traits/spells/spells";

export default class monster {
	constructor(
		public basicInfo: basicInfo,
		public stats: stats,
		public features: features,
		public traits: traits,
		public actions: description[],
		public legendaryActionsDescription: string,
		public legendaryActions: description[]
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
