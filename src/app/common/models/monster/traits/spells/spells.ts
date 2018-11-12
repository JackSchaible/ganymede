import Spell from "./spell";
import classInstance from "../../classes/ClassInstance";

export enum spellcastingType {
	none = 0,
	spellcasting = 1,
	innate = 2,
	psionics = 3
}

export class spells {
	public type: spellcastingType;

	constructor() {
		this.type = spellcastingType.none;
	}
}

export class spellcasting extends spells {
	constructor(public classInstance: classInstance, public spells: Spell[]) {
		super();
		this.type = spellcastingType.spellcasting;
	}
}

export class Innate extends spells {
	constructor() {
		super();
		this.type = spellcastingType.innate;
	}
}

export class Psionics extends spells {
	constructor() {
		super();
		this.type = spellcastingType.psionics;
	}
}
