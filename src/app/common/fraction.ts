export default class Fraction {
	constructor(public N: number, public D: number) {}

	public toString() {
		return `${this.N}/${this.D}`;
	}
}
