import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class paladin extends spellcastingClass {
	constructor() {
		super("Paladin", "Charisma", spellData.spellSlotAdvancement.halfCaster);
	}
}
