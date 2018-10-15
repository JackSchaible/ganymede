export default class Alignment {
	constructor(
		public lawfulGood: boolean,
		public lawfulNeutral: boolean,
		public lawfulEvil: boolean,
		public neutralGood: boolean,
		public neutral: boolean,
		public neutralEvil: boolean,
		public chaoticGood: boolean,
		public chaoticNeutral: boolean,
		public chaoticEvil: boolean
	) {}

	public static Default() {
		return new Alignment(
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false
		);
	}
}
