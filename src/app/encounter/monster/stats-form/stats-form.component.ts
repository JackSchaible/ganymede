import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import Values from "../../../common/models/values";
import { CalculatorService } from "../../../services/calculator.service";
import MonsterForm from "../monsterForm";
import { MatSnackBar } from "@angular/material";
import MovementType from "src/app/common/models/monster/stats/movementType";

@Component({
	selector: "gm-stats-form",
	templateUrl: "./stats-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class StatsFormComponent extends MonsterForm {
	protected form = {
		str: [],
		dex: [],
		con: [],
		int: [],
		wis: [],
		cha: [],
		ac_base: [],
		ac_ability: [],
		ac_misc: [],
		hp_count: [],
		hp_sides: [],
		speed: [],
		speed_type: [],
		speed_length: []
	};

	private abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
	private abilityMod: number;
	private movementTypes: string[] = Values.MovementTypes;

	constructor(
		calculator: CalculatorService,
		formBuilder: FormBuilder,
		changeDetector: ChangeDetectorRef,
		snackBar: MatSnackBar
	) {
		super(calculator, formBuilder, changeDetector, snackBar);
	}

	onFormChanges(form: any): void {
		this.abilityMod = this.getAcMod();
	}

	isComplete(): boolean {
		return false;
	}

	private getAcMod(): number {
		let stat: number = 0;

		const stats = this.monster.Stats;
		switch (this.monster.Stats.AC.AbilityModifier) {
			case "STR":
				stat = stats.Strength;
				break;
			case "DEX":
				stat = stats.Dexterity;
				break;
			case "CON":
				stat = stats.Constitution;
				break;
			case "INT":
				stat = stats.Intelligence;
				break;
			case "WIS":
				stat = stats.Wisdom;
				break;
			case "CHA":
				stat = stats.Charisma;
				break;
		}

		return this.calculator.getModifierNumber(stat);
	}

	private randomStats() {
		this.calculator.randomStats(this.monster.Stats);
		this.changeDetector.detectChanges();
	}

	private addMovement(event) {
		const typeInput = this.formGroup.controls["speed_type"];
		const distanceInput = this.formGroup.controls["speed_length"];

		let type = typeInput.value;
		const distanceStr = distanceInput.value;

		if (type && distanceStr) {
			type = type.trim();
			const dist = parseInt(distanceStr, 10);

			const newMove = new MovementType(type, dist);

			if (this.monster.Stats.ExtraMovementTypes.indexOf(newMove) === -1)
				this.monster.Stats.ExtraMovementTypes.push(newMove);
			else this.openSnackBar("That movement type already exists!");
		}

		if (typeInput) typeInput.setValue("");
		if (distanceInput) distanceInput.setValue("");
	}

	private removeMovement(movement) {
		let index = -1;

		for (let i = 0; i < this.monster.Stats.ExtraMovementTypes.length; i++)
			if (this.monster.Stats.ExtraMovementTypes[i].Type === movement) index = i;

		if (index >= 0) this.monster.Stats.ExtraMovementTypes.splice(index, 1);
	}
}
