import { Component, OnInit, Input, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import Values from "../../../common/models/values";
import Monster from "../../../common/models/monster";
import { CalculatorService } from "../../../services/calculator.service";
import MovementType from "../../../common/models/stats/movementType";

@Component({
	selector: "gm-stats-form",
	templateUrl: "./stats-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class StatsFormComponent implements OnInit {
	@Input()
	@Output()
	public monster: Monster;

	@Input()
	public OnChange: any;

	@Input()
	public OpenSnackbar: any;

	private statsFormGroup: FormGroup;
	private abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
	private abilityMod: number;
	private movementTypes: string[] = Values.MovementTypes;

	constructor(
		private formBuilder: FormBuilder,
		private calculator: CalculatorService
	) {}

	ngOnInit() {
		this.statsFormGroup = this.formBuilder.group({
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
		});

		this.statsFormGroup.valueChanges.subscribe(form => this.statFormChange());
	}

	private statFormChange() {
		this.OnChange();
		this.abilityMod = this.getAcMod();
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
		this.OnChange();
	}

	private addMovement(event) {
		const typeInput = this.statsFormGroup.controls["speed_type"];
		const distanceInput = this.statsFormGroup.controls["speed_length"];

		let type = typeInput.value;
		const distanceStr = distanceInput.value;

		if (type && distanceStr) {
			type = type.trim();
			const dist = parseInt(distanceStr, 10);

			const newMove = new MovementType(type, dist);

			if (this.monster.Stats.ExtraMovementTypes.indexOf(newMove) === -1)
				this.monster.Stats.ExtraMovementTypes.push(newMove);
			else this.OpenSnackbar("That movement type already exists!");
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
