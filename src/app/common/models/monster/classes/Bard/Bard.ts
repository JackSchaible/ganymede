import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Bard extends SpellcastingClass {
	constructor() {
		super("Bard", "Charisma", SpellData.SpellSlotAdvancement.FullCaster);
	}
}
