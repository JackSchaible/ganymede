import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class warlock extends spellcastingClass {
	constructor() {
		super("Warlock", "Charisma", spellData.spellSlotAdvancement.warlock);
	}
}
