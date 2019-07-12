export class SpellComponents {
	public id: number;
	public verbal: boolean;
	public somatic: boolean;
	public material: string[];

	public static getDefault(): SpellComponents {
		const c = new SpellComponents();
		c.id = -1;

		return c;
	}
}
