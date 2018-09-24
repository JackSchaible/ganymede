import Alignment from "./alignment";

export default class BasicInfo {
	constructor(
		public Name: string,
		public XP: number,
		public Type: string,
		public Tags: string[],
		public Alignment: Alignment,
		public Size: string
	) {}
}
