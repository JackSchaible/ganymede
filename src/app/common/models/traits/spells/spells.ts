import Spell from "./spell";

export default class Spells {
	constructor(
		public Class: string,
		public Level: number,
		public Ability: string,
		public Spells: Spell[]
	) {}
}
