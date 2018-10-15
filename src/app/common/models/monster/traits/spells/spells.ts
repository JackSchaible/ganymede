import Spell from "./spell";
import ClassInstance from "../../classes/ClassInstance";

export enum SpellcastingType {
	None = 0,
	Spellcasting = 1,
	Innate = 2,
	Psionics = 3
}

export class Spells {
	public Type: SpellcastingType;

	constructor() {
		this.Type = SpellcastingType.None;
	}
}

export class Spellcasting extends Spells {
	constructor(public ClassInstance: ClassInstance, public Spells: Spell[]) {
		super();
		this.Type = SpellcastingType.Spellcasting;
	}
}

export class Innate extends Spells {
	constructor() {
		super();
		this.Type = SpellcastingType.Innate;
	}
}

export class Psionics extends Spells {
	constructor() {
		super();
		this.Type = SpellcastingType.Psionics;
	}
}
