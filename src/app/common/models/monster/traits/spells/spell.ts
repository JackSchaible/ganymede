import spellComponents from "./spellComponents";
import { spellSchool } from "../../classes/SpellData";
import { playerClass } from "../../../values";
import castingTime from "./castingTime";
import range from "./range";
import spellDuration from "./spellDuration";

export default class spell {
	constructor(
		public id: number,
		public name: string,
		public level: number,
		public school: spellSchool,
		public classes: playerClass[],
		public castingTime: castingTime,
		public range: range,
		public components: spellComponents,
		public duration: spellDuration,
		public description: string,
		public atHigherLevels: string
	) {}

	public static makeDefault() {
		return new spell(
			-1,
			"Unknown Name",
			0,
			spellSchool.abjuration,
			[playerClass.bard],
			new castingTime("unknown", null),
			new range("unknown", null),
			new spellComponents(false, false, null),
			new spellDuration("unknown", null),
			"<p></p>",
			null
		);
	}

	public static newSpell() {
		return new spell(
			-1,
			"",
			0,
			spellSchool.abjuration,
			[],
			new castingTime("", null),
			new range("", null),
			new spellComponents(false, false, null),
			new spellDuration("unknown", null),
			"<p></p>",
			null
		);
	}
}
