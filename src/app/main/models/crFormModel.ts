export class CRFormModel {
	public ac: number;
	public hp: number;
	public bab: number;
	public dps: number;

	public static isEqual(a: CRFormModel, b: CRFormModel): boolean {
		if ((!a && b) || (a && !b)) return false;
		if (!a && !b) return true;

		return (
			a === b ||
			(a.ac === b.ac &&
				a.hp === b.hp &&
				a.bab === b.bab &&
				a.dps === b.dps)
		);
	}
}
