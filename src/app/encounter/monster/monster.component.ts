import { Component, Input, OnInit, ViewChild } from "@angular/core";
import Monster from "../../common/models/monster";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Values, { ISize, IMonsterType } from "../../common/models/values";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatSnackBar, MatCheckboxChange } from "@angular/material";
import { MonsterCardComponent } from "../../common/monster-card/monster-card.component";
import { CalculatorService } from "../../services/calculator.service";
import MovementType from "../../common/models/stats/movementType";
import Sense from "../../common/models/features/sense";
import Skill from "../../common/models/features/skill";

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

	private statsFormGroup: FormGroup;
	private abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
	private abilityMod: number;
	private movementTypes: string[] = Values.MovementTypes;

	private featuresFormGroup: FormGroup;
	private senseTypes: string[] = Values.SenseTypes;
	private skills: Skill[] = Values.Skills;

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
			type: [],
			prof: []
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

		this.featuresFormGroup = this.formBuilder.group({
			sense_type: [],
			sense_distance: [],
			skill_name: [],
			skill_ability: [],
			skill_prof: []
		});

		this.basicInfoFormGroup.valueChanges.subscribe(form =>
			this.basicInfoFormChange(form)
		);

		this.statsFormGroup.valueChanges.subscribe(form => this.statFormChange());

		this.featuresFormGroup.valueChanges.subscribe(form =>
			this.featuresFormChange()
		);
	}

	//#region Basic Info Form
	private basicInfoFormChange(form) {
		this.card.CalculateValues();

		if (form.type)
			for (let i = 0; i < this.types.length; i++)
				if (this.types[i].Name === form.type) this.selectedType = this.types[i];
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
	//#endregion

	//#region Stat Form
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
	//#endregion

	//#region Features Form
	private featuresFormChange() {
		this.card.CalculateValues();
	}

	private triggerFeaturesForm(e: MatCheckboxChange) {
		if (!e || !e.source) return;

		if (e.checked) {
			if (e.source.name === "Strength")
				this.monster.Features.SavingThrows.push(
					new Skill("Strength", "Strength", 1)
				);
			if (e.source.name === "Dexterity")
				this.monster.Features.SavingThrows.push(
					new Skill("Dexterity", "Dexterity", 1)
				);
			if (e.source.name === "Constitution")
				this.monster.Features.SavingThrows.push(
					new Skill("Constitution", "Constitution", 1)
				);
			if (e.source.name === "Intelligence")
				this.monster.Features.SavingThrows.push(
					new Skill("Intelligence", "Intelligence", 1)
				);
			if (e.source.name === "Wisdom")
				this.monster.Features.SavingThrows.push(
					new Skill("Wisdom", "Wisdom", 1)
				);
			if (e.source.name === "Charisma")
				this.monster.Features.SavingThrows.push(
					new Skill("Charisma", "Charisma", 1)
				);
		} else {
			let index = -1;

			for (let i = 0; i < this.monster.Features.SavingThrows.length; i++) {
				if (this.monster.Features.SavingThrows[i].Name === e.source.name)
					index = i;
			}

			if (index > -1) this.monster.Features.SavingThrows.splice(index, 1);
		}

		if (this.featuresFormGroup)
			this.featuresFormGroup.updateValueAndValidity({
				onlySelf: false,
				emitEvent: true
			});
	}

	private getPP() {
		return this.calculator.calcPP(this.monster.Stats);
	}

	private addSense(event) {
		const typeInput = this.featuresFormGroup.controls["sense_type"];
		const distanceInput = this.featuresFormGroup.controls["sense_distance"];

		let type = typeInput.value;
		const distanceStr = distanceInput.value;

		if (type && distanceStr) {
			type = type.trim();
			const dist = parseInt(distanceStr, 10);

			const newSense = new Sense(type, dist);

			if (this.monster.Features.ExtraSenses.indexOf(newSense) === -1)
				this.monster.Features.ExtraSenses.push(newSense);
			else this.openSnackBar("That sense type already exists!");
		}

		if (typeInput) typeInput.setValue("");
		if (distanceInput) distanceInput.setValue("");
	}

	private removeSense(sense) {
		let index = 0;

		console.log("e");

		for (let i = 0; i < this.monster.Features.ExtraSenses.length; i++)
			if (this.monster.Features.ExtraSenses[i].Type === sense) index = i;

		if (index >= 0) this.monster.Features.ExtraSenses.splice(index, 1);
	}
	//#endregion
}
