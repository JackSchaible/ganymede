export default class spellData {
	public static spellSlotAdvancement = {
		fullCaster: [
			[2, 0, 0, 0, 0, 0, 0, 0, 0], //1
			[3, 0, 0, 0, 0, 0, 0, 0, 0], //2
			[4, 2, 0, 0, 0, 0, 0, 0, 0], //3
			[4, 3, 0, 0, 0, 0, 0, 0, 0], //4
			[4, 3, 2, 0, 0, 0, 0, 0, 0], //5
			[4, 3, 3, 0, 0, 0, 0, 0, 0], //6
			[4, 3, 3, 1, 0, 0, 0, 0, 0], //7
			[4, 3, 3, 2, 0, 0, 0, 0, 0], //8
			[4, 3, 3, 3, 1, 0, 0, 0, 0], //9
			[4, 3, 3, 3, 2, 0, 0, 0, 0], //10
			[4, 3, 3, 3, 2, 1, 0, 0, 0], //11
			[4, 3, 3, 3, 2, 1, 0, 0, 0], //12
			[4, 3, 3, 3, 2, 1, 1, 0, 0], //13
			[4, 3, 3, 3, 2, 1, 1, 0, 0], //14
			[4, 3, 3, 3, 2, 1, 1, 1, 0], //15
			[4, 3, 3, 3, 2, 1, 1, 1, 0], //16
			[4, 3, 3, 3, 2, 1, 1, 1, 1], //17
			[4, 3, 3, 3, 3, 1, 1, 1, 1], //18
			[4, 3, 3, 3, 3, 2, 1, 1, 1], //19
			[4, 3, 3, 3, 3, 2, 2, 1, 1] //20
		],

		halfCaster: [
			[0, 0, 0, 0, 0], //1
			[2, 0, 0, 0, 0], //2
			[3, 0, 0, 0, 0], //3
			[3, 0, 0, 0, 0], //4
			[4, 2, 0, 0, 0], //5
			[4, 2, 0, 0, 0], //6
			[4, 3, 0, 0, 0], //7
			[4, 3, 0, 0, 0], //8
			[4, 3, 2, 0, 0], //9
			[4, 3, 2, 0, 0], //10
			[4, 3, 3, 0, 0], //11
			[4, 3, 3, 0, 0], //12
			[4, 3, 3, 1, 0], //13
			[4, 3, 3, 1, 0], //14
			[4, 3, 3, 2, 0], //15
			[4, 3, 3, 2, 0], //16
			[4, 3, 3, 3, 1], //17
			[4, 3, 3, 3, 1], //18
			[4, 3, 3, 3, 2], //19
			[4, 3, 3, 3, 2] //20
		],

		warlock: [
			[1, 0, 0, 0, 0], //1
			[2, 0, 0, 0, 0], //2
			[0, 2, 0, 0, 0], //3
			[0, 2, 0, 0, 0], //4
			[0, 0, 2, 0, 0], //5
			[0, 0, 2, 0, 0], //6
			[0, 0, 0, 2, 0], //7
			[0, 0, 0, 2, 0], //8
			[0, 0, 0, 0, 2], //9
			[0, 0, 0, 0, 2], //10
			[0, 0, 0, 0, 3], //11
			[0, 0, 0, 0, 3], //12
			[0, 0, 0, 0, 3], //13
			[0, 0, 0, 0, 3], //14
			[0, 0, 0, 0, 3], //15
			[0, 0, 0, 0, 3], //16
			[0, 0, 0, 0, 4], //17
			[0, 0, 0, 0, 4], //18
			[0, 0, 0, 0, 4], //19
			[0, 0, 0, 0, 4] //20
		]
	};

	public static cantrips = {
		bardDruid: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		clericWizard: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		sorcerer: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
	};

	public static castingTimes: string[] = [
		"action",
		"Reaction",
		"bonus action",
		"round",
		"minute",
		"hour"
	];
	public static ranges: string[] = ["Self", "Touch", "feet", "hour"];
	public static durations: string[] = [
		"Instantaneous",
		"round",
		"minute",
		"hour",
		"day",
		"year",
		"special",
		"Until dispelled",
		"Until triggered",
		"Until dispelled or triggered"
	];
}

export enum SpellSchool {
	abjuration,
	conjuration,
	divination,
	enchantment,
	evocation,
	illusion,
	necromancy,
	transmutation
}
