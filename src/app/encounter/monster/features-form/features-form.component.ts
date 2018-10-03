import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import Values from "../../../common/models/values";
import Skill, { SkillGroup } from "../../../common/models/features/skill";
import Feature from "../../../common/models/feature";
import Sense from "../../../common/models/features/sense";
import { MatCheckboxChange, MatSnackBar } from "@angular/material";
import { CalculatorService } from "../../../services/calculator.service";
import MonsterForm from "../mosnterForm";

@Component({
	selector: "gm-features-form",
	templateUrl: "./features-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class FeaturesFormComponent extends MonsterForm {
	protected form = {
		sense_type: [],
		sense_distance: [],
		skill_name: [],
		skill_ability: [],
		vulnerability: [],
		resistance: [],
		immunity: [],
		conditionImmunity: [],
		language: [],
		telepathy: [],
		ef_name: [],
		ef_desc: []
	};

	private senseTypes: string[] = Values.SenseTypes;
	private skills: SkillGroup[] = Values.Skills;
	private dblSkillProf: boolean;
	private skillAbility: string;
	private damageTypes: string[] = Values.DamageTypes;
	private conditions: string[] = Values.Conditions;
	private languages: string[] = Values.Languages;
	private hasTelepathy: boolean = false;

	constructor(
		calculator: CalculatorService,
		formBuilder: FormBuilder,
		changeDetector: ChangeDetectorRef,
		snackbar: MatSnackBar
	) {
		super(calculator, formBuilder, changeDetector, snackbar);
	}

	onFormChanges(form) {}

	isComplete(): boolean {
		return false;
	}

	private skillChanged(validateSkillAbility: boolean = false) {
		if (
			validateSkillAbility &&
			this.formGroup.controls["skill_name"] &&
			this.formGroup.controls["skill_name"].value
		) {
			for (let i = 0; i < this.skills.length; i++)
				for (let j = 0; j < this.skills[i].Skills.length; j++)
					if (
						this.skills[i].Skills[j].Name ===
						this.formGroup.controls["skill_name"].value
					)
						this.skillAbility = this.skills[i].Ability;
		}
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

		this.triggerFormChange();
	}

	private getPP() {
		return this.calculator.calcPP(this.monster.Stats);
	}

	private addSense() {
		const typeInput = this.formGroup.controls["sense_type"];
		const distanceInput = this.formGroup.controls["sense_distance"];

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
		const nameInput = this.formGroup.controls["skill_name"];

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
		const input = this.formGroup.controls["vulnerability"];

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
		const input = this.formGroup.controls["resistance"];
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
		const input = this.formGroup.controls["immunity"];
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
		const input = this.formGroup.controls["conditionImmunity"];
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
		const input = this.formGroup.controls["language"];
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

	private addFeature() {
		const nameInput = this.formGroup.controls["ef_name"];
		const descInput = this.formGroup.controls["ef_desc"];

		let name = nameInput.value;
		let desc = descInput.value;

		if (!name || !desc) return;

		name = name.trim();
		desc = desc.trim();

		let newFeature = new Feature(name, desc);

		const features = this.monster.Features.ExtraFeatures;
		for (let i = 0; i < features.length; i++)
			if (features[i].Name === newFeature.Name) {
				this.monster.Features.ExtraFeatures[i].Description = desc;
				newFeature = null;
			}

		if (newFeature) this.monster.Features.ExtraFeatures.push(newFeature);
		this.triggerFeaturesForm(null);

		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private removeFeature(feature) {
		let index = -1;

		for (let i = 0; i < this.monster.Features.ExtraFeatures.length; i++)
			if (this.monster.Features.ExtraFeatures[i].Name === feature) index = i;

		if (index >= 0) this.monster.Features.ExtraFeatures.splice(index, 1);

		const nameInput = this.formGroup.controls["ef_name"];
		const descInput = this.formGroup.controls["ef_desc"];
		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private showFeature(feature: Feature) {
		this.formGroup.controls["ef_name"].setValue(feature.Name);
		this.formGroup.controls["ef_desc"].setValue(feature.Description);
	}
}
