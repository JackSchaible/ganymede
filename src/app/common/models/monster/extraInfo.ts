import description from "./description";

export default class extraInfo {
	constructor(
		public challenge: number,
		public senses: string,
		public skills: description[]
	) {}
}
