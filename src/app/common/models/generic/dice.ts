export default class Dice {
	constructor(
		public Count: number,
		public Sides: number,
		public Modifier: number = 0
	) {}

	static Default() {
		return new Dice(0, 0, 0);
	}

	toString() {
		let result = `${this.Count}d${this.Sides}`;

		if (this.Modifier)
			result +=
				this.Modifier > 0 ? `+` : this.Modifier < 0 ? `-` : `` + this.Modifier;

		return result;
	}
}
