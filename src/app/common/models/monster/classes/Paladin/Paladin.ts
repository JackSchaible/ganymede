import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Paladin extends SpellcastingClass {
	constructor() {
		super("Paladin", "Charisma", SpellData.SpellSlotAdvancement.HalfCaster);
	}
}
