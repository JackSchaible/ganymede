import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class sorcerer extends spellcastingClass {
	constructor() {
		super(
			"Sorcerer",
			"Charisma",
			spellData.spellSlotAdvancement.fullCaster,
			spellData.cantrips.sorcerer
		);
	}
}
