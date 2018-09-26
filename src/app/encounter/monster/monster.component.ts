import { Component, Input, OnInit, ViewChild } from "@angular/core";
import Monster from "../../common/models/monster";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Values, { ISize, IMonsterType } from "../../common/models/values";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatSnackBar } from "@angular/material";
import { MonsterCardComponent } from "../../common/monster-card/monster-card.component";
import { CalculatorService } from "../../services/calculator.service";
import MovementType from "../../common/models/stats/movementType";

@Component({
	selector: "gm-monster",
	templateUrl: "./monster.component.html",
	styleUrls: ["./monster.component.scss"]
})
export class MonsterComponent implements OnInit {
	@Input()
	public monster: Monster;

	@ViewChild(MonsterCardComponent)
	private card: MonsterCardComponent;

	private basicInfoFormGroup: FormGroup;
	private sizes: ISize[] = Values.Sizes;
	private types: IMonsterType[] = Values.Types;
	private selectedType: IMonsterType;
	private separatorKeysCodes: number[] = [ENTER, COMMA];
	private form1Complete: boolean = false;

	private statsFormGroup: FormGroup;
	private abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
	private abilityMod: number;
	private movementTypes: string[] = Values.MovementTypes;

	constructor(
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private calculator: CalculatorService
	) {
		if (!this.monster) this.monster = Monster.New();

		this.alignmentChanged = this.alignmentChanged.bind(this);
	}

	public ngOnInit() {
		this.basicInfoFormGroup = this.formBuilder.group({
			name: [],
			size: [],
			type: []
		});

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

		this.basicInfoFormGroup.valueChanges.subscribe(form => {
			this.card.CalculateValues();

			if (form.type)
				for (let i = 0; i < this.types.length; i++)
					if (this.types[i].Name == form.type)
						this.selectedType = this.types[i];

			this.form1Complete = !!(
				this.monster.BasicInfo.Name &&
				this.monster.BasicInfo.Size &&
				this.monster.BasicInfo.Type
			);
		});

		this.statsFormGroup.valueChanges.subscribe(form => this.statFormChange());
	}

	private addTag(event) {
		const input = event.input;
		let value = event.value;

		if (value) {
			value = value.trim();

			if (this.monster.BasicInfo.Tags.indexOf(value) === -1)
				this.monster.BasicInfo.Tags.push(value);
			else this.openSnackBar("That tag already exists!");
		}

		if (input) input.value = "";
	}

	private removeTag(tag: string) {
		const index = this.monster.BasicInfo.Tags.indexOf(tag);
		if (index >= 0) this.monster.BasicInfo.Tags.splice(index, 1);
	}

	private alignmentChanged() {
		if (this.basicInfoFormGroup)
			this.basicInfoFormGroup.updateValueAndValidity({
				onlySelf: false,
				emitEvent: true
			});
	}

	private randomStats() {
		this.monster.Stats = this.calculator.randomStats();
		this.card.CalculateValues();
	}

	private statFormChange() {
		this.card.CalculateValues();
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
			else this.openSnackBar("That movement type already exists!");
		}

		if (typeInput) typeInput.setValue("");
		if (distanceInput) distanceInput.setValue("");
	}

	private removeMovement(movement) {
		let index = 0;

		console.log("e");

		for (let i = 0; i < this.monster.Stats.ExtraMovementTypes.length; i++)
			if (this.monster.Stats.ExtraMovementTypes[i].Type === movement) index = i;

		if (index >= 0) this.monster.Stats.ExtraMovementTypes.splice(index, 1);
	}

	private openSnackBar(message: string) {
		const sb = this.snackBar.open(message);

		setTimeout(() => {
			sb.dismiss();
		}, 3000);
	}
}
