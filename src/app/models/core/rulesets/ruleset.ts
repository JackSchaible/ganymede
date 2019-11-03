import { Publisher } from "./publisher";

export class Ruleset {
	public id: number;
	public name: string;
	public abbreviation: string;
	public releaseDate: Date;
	public publisher: Publisher;

	public static getDefault(): Ruleset {
		return {
			id: undefined,
			name: undefined,
			abbreviation: undefined,
			releaseDate: undefined,
			publisher: Publisher.getDefault()
		};
	}
}
