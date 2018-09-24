import Monster from "./monster";

export default class Encounter {
	constructor(
		public Name: string,
		public Difficulty: string,
		public XP: number,
		public Location: number,
		public Monsters: Monster[],
		public Notes: string
	) {}
}
