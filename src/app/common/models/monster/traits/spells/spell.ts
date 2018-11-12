import SpellComponents from "./spellComponents";
import { SpellSchool } from "../../classes/SpellData";
import { PlayerClass } from "../../../values";
import CastingTime from "./castingTime";
import Range from "./range";
import SpellDuration from "./spellDuration";

export default class Spell {
	constructor(
		public spellID: number,
		public name: string,
		public level: number,
		public school: SpellSchool,
		public classes: PlayerClass[],
		public castingTime: CastingTime,
		public range: Range,
		public components: SpellComponents,
		public duration: SpellDuration,
		public description: string,
		public atHigherLevels: string
	) { }

	public static makeDefault() {
		return new Spell(
			-1,
			"Unknown Name",
			0,
			SpellSchool.abjuration,
			[PlayerClass.bard],
			new CastingTime("unknown", "action"),
			new Range("unknown", "feet"),
			new SpellComponents(false, false, null),
			new SpellDuration("unknown", "minute", false),
			"<p></p>",
			null
		);
	}

	public static newSpell() {
		return new Spell(
			-1,
			"",
			0,
			SpellSchool.abjuration,
			[],
			new CastingTime("", null),
			new Range("", null),
			new SpellComponents(false, false, null),
			new SpellDuration("unknown", null),
			"<p></p>",
			null
		);
	}
}
