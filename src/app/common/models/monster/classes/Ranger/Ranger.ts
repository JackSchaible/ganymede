import SpellcastingClass from "../SpellcastingClass";
import SpellData from "../SpellData";

export default class Ranger extends SpellcastingClass {
	constructor() {
		super("Ranger", "Wisdom", SpellData.SpellSlotAdvancement.HalfCaster);
	}
}
