export class SpellSchool {
	public id: number;
	public name: string;
	public description: string;

	public static getDefault(): SpellSchool {
		return {
			id: -1,
			name: undefined,
			description: undefined
		};
	}
}
