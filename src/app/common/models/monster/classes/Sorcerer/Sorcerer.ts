import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Sorcerer extends SpellcastingClass {
	constructor() {
		super("Sorcerer", "Charisma", SpellData.SpellSlotAdvancement.FullCaster);
	}
}
