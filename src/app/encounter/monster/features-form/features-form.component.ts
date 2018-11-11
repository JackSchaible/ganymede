import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import values from "../../../common/models/values";
import feature from "../../../common/models/monster/feature";
import { MatCheckboxChange, MatSnackBar } from "@angular/material";
import { CalculatorService } from "../../../services/calculator.service";
import MonsterForm from "../monsterForm";
import skill, {
	skillGroup
} from "src/app/common/models/monster/features/skill";
import sense from "src/app/common/models/monster/features/sense";

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

	private senseTypes: string[] = values.senseTypes;
	private skills: skillGroup[] = values.skills;
	private dblSkillProf: boolean;
	private skillAbility: string;
	private damageTypes: string[] = values.damageTypes;
	private conditions: string[] = values.conditions;
	private languages: string[] = values.languages;
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
				for (let j = 0; j < this.skills[i].skills.length; j++)
					if (
						this.skills[i].skills[j].name ===
						this.formGroup.controls["skill_name"].value
					)
						this.skillAbility = this.skills[i].ability;
		}
	}

	private triggerFeaturesForm(e: MatCheckboxChange) {
		if (e && e.source) {
			if (e.checked) {
				if (e.source.name === "Strength")
					this.monster.features.savingThrows.push(
						new skill("Strength", "Strength", 1)
					);
				if (e.source.name === "Dexterity")
					this.monster.features.savingThrows.push(
						new skill("Dexterity", "Dexterity", 1)
					);
				if (e.source.name === "Constitution")
					this.monster.features.savingThrows.push(
						new skill("Constitution", "Constitution", 1)
					);
				if (e.source.name === "Intelligence")
					this.monster.features.savingThrows.push(
						new skill("Intelligence", "Intelligence", 1)
					);
				if (e.source.name === "Wisdom")
					this.monster.features.savingThrows.push(
						new skill("Wisdom", "Wisdom", 1)
					);
				if (e.source.name === "Charisma")
					this.monster.features.savingThrows.push(
						new skill("Charisma", "Charisma", 1)
					);
				if (e.source.name === "Double Proficiency") this.dblSkillProf = true;
				if (e.source.name === "Can Speak")
					this.monster.features.languages.canSpeak = true;
				if (e.source.name === "Has Telepathy") this.hasTelepathy = true;
			} else if (e.source.name === "Double Proficiency")
				this.dblSkillProf = false;
			else if (e.source.name === "Can Speak")
				this.monster.features.languages.canSpeak = false;
			else if (e.source.name === "Has Telepathy") this.hasTelepathy = false;
			else {
				let index = -1;

				for (let i = 0; i < this.monster.features.savingThrows.length; i++) {
					if (this.monster.features.savingThrows[i].name === e.source.name)
						index = i;
				}

				if (index > -1) this.monster.features.savingThrows.splice(index, 1);
			}
		}

		this.triggerFormChange();
	}

	private getPP() {
		return this.calculator.calcPP(this.monster.stats);
	}

	private addSense() {
		const typeInput = this.formGroup.controls["sense_type"];
		const distanceInput = this.formGroup.controls["sense_distance"];

		let type = typeInput.value;
		const distanceStr = distanceInput.value;

		if (type && distanceStr) {
			type = type.trim();
			const dist = parseInt(distanceStr, 10);

			const newSense = new sense(type, dist);

			if (this.monster.features.extraSenses.indexOf(newSense) === -1)
				this.monster.features.extraSenses.push(newSense);
			else this.openSnackBar("That sense type already exists!");
		}

		if (typeInput) typeInput.setValue("");
		if (distanceInput) distanceInput.setValue("");
	}

	private removeSense(sense) {
		let index = -1;

		for (let i = 0; i < this.monster.features.extraSenses.length; i++)
			if (this.monster.features.extraSenses[i].type === sense) index = i;

		if (index >= 0) this.monster.features.extraSenses.splice(index, 1);
	}

	private addSkill() {
		const nameInput = this.formGroup.controls["skill_name"];

		let name = nameInput.value;
		let ability = this.skillAbility;

		if (name && ability) {
			name = name.trim();
			ability = ability.trim();

			const newSkill = new skill(name, ability, this.dblSkillProf ? 2 : 1);

			const skills = this.monster.features.skills;
			for (let i = 0; i < skills.length; i++)
				if (skills[i].name == newSkill.name) {
					this.openSnackBar("That skill already exists!");
					return;
				}

			this.monster.features.skills.push(newSkill);
			this.triggerFeaturesForm(null);
		}

		if (nameInput) nameInput.setValue("");
		if (this.skillAbility) this.skillAbility = null;
		if (this.dblSkillProf) this.dblSkillProf = false;
	}

	private removeSkill(skillName) {
		let index = -1;

		for (let i = 0; i < this.monster.features.skills.length; i++)
			if (this.monster.features.skills[i].name === skillName) index = i;

		if (index >= 0) this.monster.features.skills.splice(index, 1);
	}

	private addVulnerability() {
		const input = this.formGroup.controls["vulnerability"];

		let vulnerability = input.value;

		if (vulnerability) {
			vulnerability = vulnerability.trim();

			if (
				this.monster.features.damageVulnerabilities.indexOf(vulnerability) ===
				-1
			)
				this.monster.features.damageVulnerabilities.push(vulnerability);
			else this.openSnackBar("That Damage Vulnerability already exists!");
		}

		if (input) input.setValue("");
	}

	private removeVulnerability(vulnerability) {
		const index = this.monster.features.damageVulnerabilities.indexOf(
			vulnerability
		);
		if (index >= 0)
			this.monster.features.damageVulnerabilities.splice(index, 1);
	}

	private addResistance() {
		const input = this.formGroup.controls["resistance"];
		let resistance = input.value;

		if (resistance) {
			resistance = resistance.trim();

			if (this.monster.features.damageResistances.indexOf(resistance) === -1)
				this.monster.features.damageResistances.push(resistance);
			else this.openSnackBar("That Damage Resistance already exists!");
		}

		if (input) input.setValue("");
	}

	private removeResistance(resistance) {
		const index = this.monster.features.damageResistances.indexOf(resistance);
		if (index >= 0) this.monster.features.damageResistances.splice(index, 1);
	}

	private addImmunity() {
		const input = this.formGroup.controls["immunity"];
		let immunity = input.value;

		if (immunity) {
			immunity = immunity.trim();

			if (this.monster.features.damageImmunities.indexOf(immunity) === -1)
				this.monster.features.damageImmunities.push(immunity);
			else this.openSnackBar("That Damage Immunity already exists!");
		}

		if (input) input.setValue("");
	}

	private removeImmunity(immunity) {
		const index = this.monster.features.damageImmunities.indexOf(immunity);
		if (index >= 0) this.monster.features.damageImmunities.splice(index, 1);
	}

	private addCondition() {
		const input = this.formGroup.controls["conditionImmunity"];
		let condition = input.value;

		if (condition) {
			condition = condition.trim();

			if (this.monster.features.conditionImmunities.indexOf(condition) === -1)
				this.monster.features.conditionImmunities.push(condition);
			else this.openSnackBar("That Condition Immunity already exists!");
		}

		if (input) input.setValue("");
	}

	private removeCondition(condition) {
		const index = this.monster.features.conditionImmunities.indexOf(condition);
		if (index >= 0) this.monster.features.conditionImmunities.splice(index, 1);
	}

	private addLanguage() {
		const input = this.formGroup.controls["language"];
		let language = input.value;

		if (language) {
			language = language.trim();

			if (this.monster.features.languages.languages.indexOf(language) === -1)
				this.monster.features.languages.languages.push(language);
			else this.openSnackBar("That Language already exists!");
		}

		if (input) input.setValue("");
	}

	private removeLanguage(language) {
		const index = this.monster.features.languages.languages.indexOf(language);
		if (index >= 0) this.monster.features.languages.languages.splice(index, 1);
	}

	private addFeature() {
		const nameInput = this.formGroup.controls["ef_name"];
		const descInput = this.formGroup.controls["ef_desc"];

		let name = nameInput.value;
		let desc = descInput.value;

		if (!name || !desc) return;

		name = name.trim();
		desc = desc.trim();

		let newFeature = new feature(name, desc);

		const features = this.monster.features.extraFeatures;
		for (let i = 0; i < features.length; i++)
			if (features[i].name === newFeature.name) {
				this.monster.features.extraFeatures[i].description = desc;
				newFeature = null;
			}

		if (newFeature) this.monster.features.extraFeatures.push(newFeature);
		this.triggerFeaturesForm(null);

		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private removeFeature(feature) {
		let index = -1;

		for (let i = 0; i < this.monster.features.extraFeatures.length; i++)
			if (this.monster.features.extraFeatures[i].name === feature) index = i;

		if (index >= 0) this.monster.features.extraFeatures.splice(index, 1);

		const nameInput = this.formGroup.controls["ef_name"];
		const descInput = this.formGroup.controls["ef_desc"];
		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private showFeature(feature: feature) {
		this.formGroup.controls["ef_name"].setValue(feature.name);
		this.formGroup.controls["ef_desc"].setValue(feature.description);
	}
}
