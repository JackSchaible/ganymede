export default class dice {
	constructor(
		public count: number,
		public sides: number,
		public modifier: number = 0
	) {}

	static default() {
		return new dice(0, 0, 0);
	}

	toString() {
		let result = `${this.count}d${this.sides}`;

		if (this.modifier)
			result +=
				this.modifier > 0 ? `+` : this.modifier < 0 ? `-` : `` + this.modifier;

		return result;
	}
}
