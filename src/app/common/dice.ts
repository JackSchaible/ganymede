export default class Dice {
	public Count: number;
	public Sides: number;

	constructor(count: number, sides: number) {
		this.Count = count;
		this.Sides = sides;
	}

	toString() {
		return `${this.Count}d${this.Sides}`;
	}
}
