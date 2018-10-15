import Description from "./description";

export default class ExtraInfo {
	constructor(
		public Challenge: number,
		public Senses: string,
		public Skills: Description[]
	) {}
}
