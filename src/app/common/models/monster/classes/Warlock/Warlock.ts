import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Warlock extends SpellcastingClass {
	constructor() {
		super("Warlock", "Charisma", SpellData.SpellSlotAdvancement.Warlock);
	}
}
