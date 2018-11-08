export default class Skill {
	constructor(
		public Name: string,
		public ModifyingAbility: string,
		public Proficiency: number = 0
	) {
		if (this.Proficiency < 0)
			throw Error("A creature cannot have a negative proficiency in a skill.");
		else if (this.Proficiency > 2)
			throw Error(
				"A creature cannot have more than double proficiency in a skill."
			);
	}
}

export class SkillGroup {
	constructor(public Ability: string, public Skills: Skill[]) {}
}
