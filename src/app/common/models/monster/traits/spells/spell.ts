import SpellComponents from "./spellComponents";
import { SpellSchool } from "../../classes/SpellData";
import { PlayerClass } from "../../../values";

export default class Spell {
	constructor(
		public Name: string,
		public Level: number,
		public School: SpellSchool,
		public Classes: PlayerClass[],
		public CastingTime: string,
		public Range: string,
		public Components: SpellComponents,
		public Duration: string,
		public Description: string[],
		public AtHigherLevels: string
	) {}
}
