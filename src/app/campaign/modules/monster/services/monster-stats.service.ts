import { Injectable } from "@angular/core";
import { DiceRoll } from "src/app/models/core/diceRoll";
import { Monster } from "../models/monster";
import { CRService } from "src/app/main/services/cr.service";
import { Equipment } from "src/app/equipment/models/equipment";
import { Armor } from "src/app/equipment/models/armor";
import { ArmorTypes } from "src/app/equipment/models/equipmentEnums";

@Injectable({
	providedIn: "root"
})
export class MonsterStatsService {
	constructor(private crService: CRService) {}

	public calculateAverageHp = (hpRoll: DiceRoll): number =>
		Math.floor((hpRoll.sides / 2 + 0.5) * hpRoll.number);
	public getAbilityModifier = (abilityScore: number): number =>
		Math.floor((abilityScore - 10) / 2);
	public getProficiencyModByCR = (cr: number): number =>
		Math.floor((cr + 7) / 4);

	public calculateArmorClass(monster: Monster) {
		const dexMod = this.getAbilityModifier(monster.abilityScores.dexterity);
		const armors = monster.equipment.filter(
			(equipment: Equipment) => equipment instanceof Armor
		);

		let totalAC: number = 10;

		if (monster.basicStats.armorClass.naturalArmorModifier) {
			totalAC += monster.basicStats.armorClass.naturalArmorModifier;
		} else if (armors.length === 0) {
			totalAC += dexMod;
		} else {
			armors.forEach((armor: Armor) => {
				switch (armor.armorType) {
					case ArmorTypes.Light:
						totalAC = armor.ac + dexMod;
						break;

					case ArmorTypes.Medium:
						totalAC = armor.ac + Math.max(dexMod, 2);
						break;

					case ArmorTypes.Heavy:
						totalAC = armor.ac;
						break;
				}
			});

			armors
				.filter((armor: Armor) => armor.armorType === ArmorTypes.Shield)
				.forEach((shield: Armor) => (totalAC += shield.ac));
		}

		return totalAC;
	}
}
