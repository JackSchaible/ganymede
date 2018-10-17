import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CalculatorService } from "../../../services/calculator.service";
import { MatSnackBar } from "@angular/material";
import MonsterForm from "../monsterForm";
import Values from "../../../common/models/values";
import Trait from "../../../common/models/monster/traits/trait";
import {
	Spells,
	Spellcasting,
	Innate,
	Psionics
} from "../../../common/models/monster/traits/spells/spells";
import ClassInstance from "../../../common/models/monster/classes/ClassInstance";
import Bard from "../../../common/models/monster/classes/Bard/Bard";
import SpellcastingClass from "../../../common/models/monster/classes/SpellcastingClass";
import BaseClass from "../../../common/models/monster/classes/BaseClass";
import Cleric from "../../../common/models/monster/classes/Cleric/Cleric";
import Druid from "../../../common/models/monster/classes/Druid/Druid";
import Paladin from "../../../common/models/monster/classes/Paladin/Paladin";
import Ranger from "../../../common/models/monster/classes/Ranger/Ranger";
import Sorcerer from "../../../common/models/monster/classes/Sorcerer/Sorcerer";
import Warlock from "../../../common/models/monster/classes/Warlock/Warlock";
import Wizard from "../../../common/models/monster/classes/Wizard/Wizard";

@Component({
	selector: "gm-traits-form",
	templateUrl: "./traits-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class TraitsFormComponent extends MonsterForm {
	protected form = {
		trait_name: [],
		trait_desc: [],
		spellClass: [],
		spellLevel: [],
		spellAbility: []
	};

	private spellClasses = Values.SpellClasses;
	private spellcastingType: string = "none";
	private spellAllotment: any[];
	private spells;

	constructor(
		calculator: CalculatorService,
		formBuilder: FormBuilder,
		changeDetector: ChangeDetectorRef,
		snackBar: MatSnackBar
	) {
		super(calculator, formBuilder, changeDetector, snackBar);
	}

	onFormChanges(form: any): void {
		const spellLevel = parseInt(this.formGroup.controls["spellLevel"].value);
		const spellClass = this.formGroup.controls["spellClass"].value;

		if (spellLevel < 1) this.formGroup.controls["spellLevel"].setValue(1);
		else if (spellLevel > 20)
			this.formGroup.controls["spellLevel"].setValue(20);

		if (
			spellClass !==
			((this.monster.Traits.Spells as Spellcasting).ClassInstance
				.BaseClass as SpellcastingClass).Name
		) {
			let classType: BaseClass;

			switch (spellClass) {
				case "Bard":
					classType = new Bard();
					break;

				case "Cleric":
					classType = new Cleric();
					break;

				case "Druid":
					classType = new Druid();
					break;

				case "Paladin":
					classType = new Paladin();
					break;

				case "Ranger":
					classType = new Ranger();
					break;

				case "Sorcerer":
					classType = new Sorcerer();
					break;

				case "Warlock":
					classType = new Warlock();
					break;

				case "Wizard":
					classType = new Wizard();
					break;
			}

			this.monster.Traits.Spells = new Spellcasting(
				new ClassInstance(classType, spellLevel),
				[]
			);
		}

		const advancementTable = ((this.monster.Traits.Spells as Spellcasting)
			.ClassInstance.BaseClass as SpellcastingClass).SpellAdvancement;

		this.spellAllotment = [];
		for (
			let i = 0;
			i <
			advancementTable[
				(this.monster.Traits.Spells as Spellcasting).ClassInstance.Level
			].length;
			i++
		) {
			if (
				advancementTable[
					(this.monster.Traits.Spells as Spellcasting).ClassInstance.Level
				][i] === 0
			)
				continue;

			this.spellLevels.push({
				Name: i === 0 ? "Cantrips" : "Level " + i + " Spells",
				Slots:
					advancementTable[
						(this.monster.Traits.Spells as Spellcasting).ClassInstance.Level
					][i]
			});
		}
	}

	isComplete(): boolean {
		return false;
	}

	private addTrait() {
		const nameInput = this.formGroup.controls["trait_name"];
		const descInput = this.formGroup.controls["trait_desc"];

		let name = nameInput.value;
		let desc = descInput.value;

		if (!name || !desc) return;

		name = name.trim();
		desc = desc.trim();

		let newTrait = new Trait(name, desc);

		const traits = this.monster.Traits.Traits;
		for (let i = 0; i < traits.length; i++)
			if (traits[i].Name === newTrait.Name) {
				this.monster.Traits.Traits[i].Description = desc;
				newTrait = null;
			}

		if (newTrait) this.monster.Traits.Traits.push(newTrait);
		this.triggerFormChange();

		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private removeTrait(traitName: string) {
		let index = -1;

		for (let i = 0; i < this.monster.Traits.Traits.length; i++)
			if (this.monster.Traits.Traits[i].Name === traitName) index = i;

		if (index >= 0) this.monster.Traits.Traits.splice(index, 1);

		const nameInput = this.formGroup.controls["trait_name"];
		const descInput = this.formGroup.controls["trait_desc"];
		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private showTrait(trait: Trait) {
		this.formGroup.controls["trait_name"].setValue(trait.Name);
		this.formGroup.controls["trait_desc"].setValue(trait.Description);
	}

	private changeSpellcastingType(newType: number): void {
		switch (newType) {
			case 0:
				this.monster.Traits.Spells = new Spells();
				break;

			case 1:
				this.monster.Traits.Spells = new Spellcasting(
					new ClassInstance(new Bard(), 1),
					[]
				);
				break;

			case 2:
				this.monster.Traits.Spells = new Innate();
				break;

			case 3:
				this.monster.Traits.Spells = new Psionics();
				break;
		}
	}
}
