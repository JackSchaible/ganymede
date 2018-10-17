import BaseClass from "./BaseClass";

export default abstract class SpellcastingClass extends BaseClass {
	constructor(
		Name: string,
		public SpellcastingAbility: string,
		public SpellAdvancement: number[][]
	) {
		super(Name);
	}
}
