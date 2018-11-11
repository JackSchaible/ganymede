import spellcastingClass from "../SpellcastingClass";
import spellData from "../SpellData";

export default class ranger extends spellcastingClass {
	constructor() {
		super("Ranger", "Wisdom", spellData.spellSlotAdvancement.halfCaster);
	}
}
