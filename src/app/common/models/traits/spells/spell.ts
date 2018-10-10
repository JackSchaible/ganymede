import SpellComponents from "./spellComponents";

export default class Spell {
	constructor(
		public Name: string,
		public Level: number,
		public Category: string,
		public Subcategory: string,
		public Class: string,
		public CastingTime: string,
		public Range: string,
		public Comoponents: SpellComponents,
		public Duration: string,
		public Description: string,
		public AtHigherLevels: string
	) {}
}
