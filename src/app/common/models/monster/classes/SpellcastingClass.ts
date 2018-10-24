import BaseClass from "./BaseClass";

export default abstract class SpellcastingClass extends BaseClass {
	constructor(
		Name: string,
		public SpellcastingAbility: string,
		public SpellAdvancement: number[][],
		public Cantrips: number[] = null
	) {
		super(Name);
	}
}
