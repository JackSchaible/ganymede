import baseClass from "./BaseClass";

export default abstract class spellcastingClass extends baseClass {
	constructor(
		name: string,
		public spellcastingAbility: string,
		public spellAdvancement: number[][],
		public cantrips: number[] = null
	) {
		super(name);
	}
}
