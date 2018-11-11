export default class fraction {
	constructor(public n: number, public d: number) {}

	public toString() {
		return `${this.n}/${this.d}`;
	}
}
