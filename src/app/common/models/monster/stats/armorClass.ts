export default class armorClass {
	public score: number = 10;

	constructor(
		public base: number = 10,
		public abilityModifier: string,
		public miscModifier: number = 0
	) {}

	static default() {
		return new armorClass(10, "DEX", 0);
	}
}
