import SpellComponents from "./spellComponents";
import { SpellSchool } from "../../classes/SpellData";
import { PlayerClass } from "../../../values";
import CastingTime from "./castingTime";
import Range from "./range";
import SpellDuration from "./spellDuration";

export default class Spell {
	constructor(
		public ID: number,
		public Name: string,
		public Level: number,
		public School: SpellSchool,
		public Classes: PlayerClass[],
		public CastingTime: CastingTime,
		public Range: Range,
		public Components: SpellComponents,
		public Duration: SpellDuration,
		public Description: string,
		public AtHigherLevels: string
	) {}

	public static MakeDefault() {
		return new Spell(
			-1,
			"Unknown Name",
			0,
			SpellSchool.Abjuration,
			[PlayerClass.Bard],
			new CastingTime("unknown", null),
			new Range("unknown", null),
			new SpellComponents(false, false, null),
			new SpellDuration("unknown", null),
			"<p></p>",
			null
		);
	}

	public static New() {
		return new Spell(
			-1,
			"",
			0,
			SpellSchool.Abjuration,
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
