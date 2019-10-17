export class Publisher {
	public id: number;
	public name: string;

	public static getDefault(): Publisher {
		return {
			id: undefined,
			name: undefined
		};
	}
}
