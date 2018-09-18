export default class Fraction {
	public N: number;
	public D: number;

	constructor(n: number, d: number) {
		this.N = n;
		this.D = d;
	}

	public toString() {
		return `${this.N}/${this.D}`;
	}
}
