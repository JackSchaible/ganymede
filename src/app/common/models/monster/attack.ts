import dice from "../generic/dice";

export default class attack {
	constructor(
		public name: string,
		public attackBonus: number,
		public dice: dice
	) {}
}
