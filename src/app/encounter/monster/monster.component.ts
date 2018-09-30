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
import Skill, { SkillGroup } from "../../common/models/features/skill";

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
	private skills: SkillGroup[] = Values.Skills;
	private dblSkillProf: boolean;
	private skillAbility: string;
	private damageTypes: string[] = Values.DamageTypes;
	private conditions: string[] = Values.Conditions;
	private languages: string[] = Values.Languages;
	private hasTelepathy: boolean = false;

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
			vulnerability: [],
			resistance: [],
			immunity: [],
			conditionImmunity: [],
			language: [],
			telepathy: []
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

		this;
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
		let index = -1;

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
	private featuresFormChange(validateSkillAbility: boolean = false) {
		if (
			validateSkillAbility &&
			this.featuresFormGroup.controls["skill_name"] &&
			this.featuresFormGroup.controls["skill_name"].value
		) {
			for (let i = 0; i < this.skills.length; i++)
				for (let j = 0; j < this.skills[i].Skills.length; j++)
					if (
						this.skills[i].Skills[j].Name ===
						this.featuresFormGroup.controls["skill_name"].value
					)
						this.skillAbility = this.skills[i].Ability;
		}

		this.card.CalculateValues();
	}

	private triggerFeaturesForm(e: MatCheckboxChange) {
		if (e && e.source) {
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
				if (e.source.name === "Double Proficiency") this.dblSkillProf = true;
				if (e.source.name === "Can Speak")
					this.monster.Features.Languages.CanSpeak = true;
				if (e.source.name === "Has Telepathy") this.hasTelepathy = true;
			} else if (e.source.name === "Double Proficiency")
				this.dblSkillProf = false;
			else if (e.source.name === "Can Speak")
				this.monster.Features.Languages.CanSpeak = false;
			else if (e.source.name === "Has Telepathy") this.hasTelepathy = false;
			else {
				let index = -1;

				for (let i = 0; i < this.monster.Features.SavingThrows.length; i++) {
					if (this.monster.Features.SavingThrows[i].Name === e.source.name)
						index = i;
				}

				if (index > -1) this.monster.Features.SavingThrows.splice(index, 1);
			}
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

	private addSense() {
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
		let index = -1;

		for (let i = 0; i < this.monster.Features.ExtraSenses.length; i++)
			if (this.monster.Features.ExtraSenses[i].Type === sense) index = i;

		if (index >= 0) this.monster.Features.ExtraSenses.splice(index, 1);
	}

	private addSkill() {
		const nameInput = this.featuresFormGroup.controls["skill_name"];

		let name = nameInput.value;
		let ability = this.skillAbility;

		if (name && ability) {
			name = name.trim();
			ability = ability.trim();

			const newSkill = new Skill(name, ability, this.dblSkillProf ? 2 : 1);

			const skills = this.monster.Features.Skills;
			for (let i = 0; i < skills.length; i++)
				if (skills[i].Name == newSkill.Name) {
					this.openSnackBar("That skill already exists!");
					return;
				}

			this.monster.Features.Skills.push(newSkill);
			this.triggerFeaturesForm(null);
		}

		if (nameInput) nameInput.setValue("");
		if (this.skillAbility) this.skillAbility = null;
		if (this.dblSkillProf) this.dblSkillProf = false;
	}

	private removeSkill(skillName) {
		let index = -1;

		for (let i = 0; i < this.monster.Features.Skills.length; i++)
			if (this.monster.Features.Skills[i].Name === skillName) index = i;

		if (index >= 0) this.monster.Features.Skills.splice(index, 1);
	}

	private addVulnerability() {
		const input = this.featuresFormGroup.controls["vulnerability"];

		let vulnerability = input.value;

		if (vulnerability) {
			vulnerability = vulnerability.trim();

			if (
				this.monster.Features.DamageVulnerabilities.indexOf(vulnerability) ===
				-1
			)
				this.monster.Features.DamageVulnerabilities.push(vulnerability);
			else this.openSnackBar("That Damage Vulnerability already exists!");
		}

		if (input) input.setValue("");
	}

	private removeVulnerability(vulnerability) {
		const index = this.monster.Features.DamageVulnerabilities.indexOf(
			vulnerability
		);
		if (index >= 0)
			this.monster.Features.DamageVulnerabilities.splice(index, 1);
	}

	private addResistance() {
		const input = this.featuresFormGroup.controls["resistance"];
		let resistance = input.value;

		if (resistance) {
			resistance = resistance.trim();

			if (this.monster.Features.DamageResistances.indexOf(resistance) === -1)
				this.monster.Features.DamageResistances.push(resistance);
			else this.openSnackBar("That Damage Resistance already exists!");
		}

		if (input) input.setValue("");
	}

	private removeResistance(resistance) {
		const index = this.monster.Features.DamageResistances.indexOf(resistance);
		if (index >= 0) this.monster.Features.DamageResistances.splice(index, 1);
	}

	private addImmunity() {
		const input = this.featuresFormGroup.controls["immunity"];
		let immunity = input.value;

		if (immunity) {
			immunity = immunity.trim();

			if (this.monster.Features.DamageImmunities.indexOf(immunity) === -1)
				this.monster.Features.DamageImmunities.push(immunity);
			else this.openSnackBar("That Damage Immunity already exists!");
		}

		if (input) input.setValue("");
	}

	private removeImmunity(immunity) {
		const index = this.monster.Features.DamageImmunities.indexOf(immunity);
		if (index >= 0) this.monster.Features.DamageImmunities.splice(index, 1);
	}

	private addCondition() {
		const input = this.featuresFormGroup.controls["conditionImmunity"];
		let condition = input.value;

		if (condition) {
			condition = condition.trim();

			if (this.monster.Features.ConditionImmunities.indexOf(condition) === -1)
				this.monster.Features.ConditionImmunities.push(condition);
			else this.openSnackBar("That Condition Immunity already exists!");
		}

		if (input) input.setValue("");
	}

	private removeCondition(condition) {
		const index = this.monster.Features.ConditionImmunities.indexOf(condition);
		if (index >= 0) this.monster.Features.ConditionImmunities.splice(index, 1);
	}

	private addLanguage() {
		const input = this.featuresFormGroup.controls["language"];
		let language = input.value;

		if (language) {
			language = language.trim();

			if (this.monster.Features.Languages.Languages.indexOf(language) === -1)
				this.monster.Features.Languages.Languages.push(language);
			else this.openSnackBar("That Language already exists!");
		}

		if (input) input.setValue("");
	}

	private removeLanguage(language) {
		const index = this.monster.Features.Languages.Languages.indexOf(language);
		if (index >= 0) this.monster.Features.Languages.Languages.splice(index, 1);
	}
	//#endregion
}
