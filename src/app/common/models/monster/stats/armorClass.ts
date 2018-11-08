export default class ArmorClass {
	public Score: number = 10;

	constructor(
		public Base: number = 10,
		public AbilityModifier: string,
		public MiscModifier: number = 0
	) {}

	static Default() {
		return new ArmorClass(10, "DEX", 0);
	}
}
