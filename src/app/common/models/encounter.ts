import monster from "./monster/monster";

export default class encounter {
	constructor(
		public name: string,
		public difficulty: string,
		public xp: number,
		public location: number,
		public monsters: monster[],
		public notes: string
	) {}
}
