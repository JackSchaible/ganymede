export default class skill {
	constructor(
		public name: string,
		public modifyingAbility: string,
		public proficiency: number = 0
	) {
		if (this.proficiency < 0)
			throw Error("A creature cannot have a negative proficiency in a skill.");
		else if (this.proficiency > 2)
			throw Error(
				"A creature cannot have more than double proficiency in a skill."
			);
	}
}

export class skillGroup {
	constructor(public ability: string, public skills: skill[]) {}
}
