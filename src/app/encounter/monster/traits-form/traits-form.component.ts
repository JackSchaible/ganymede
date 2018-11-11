import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CalculatorService } from "../../../services/calculator.service";
import { MatSnackBar } from "@angular/material";
import MonsterForm from "../monsterForm";
import values from "../../../common/models/values";
import trait from "../../../common/models/monster/traits/trait";
import {
	spells,
	spellcasting,
	Innate,
	Psionics
} from "../../../common/models/monster/traits/spells/spells";
import classInstance from "../../../common/models/monster/classes/ClassInstance";
import bard from "../../../common/models/monster/classes/Bard/Bard";
import spellcastingClass from "../../../common/models/monster/classes/SpellcastingClass";
import baseClass from "../../../common/models/monster/classes/BaseClass";
import cleric from "../../../common/models/monster/classes/Cleric/Cleric";
import druid from "../../../common/models/monster/classes/Druid/Druid";
import paladin from "../../../common/models/monster/classes/Paladin/Paladin";
import ranger from "../../../common/models/monster/classes/Ranger/Ranger";
import sorcerer from "../../../common/models/monster/classes/Sorcerer/Sorcerer";
import warlock from "../../../common/models/monster/classes/Warlock/Warlock";
import wizard from "../../../common/models/monster/classes/Wizard/Wizard";
import { WordService } from "src/app/services/word.service";

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
		spellAbility: [],
		spellName: []
	};

	private spellClasses = values.spellClasses;
	private spellcastingType: string = "none";
	private spellAllotment: any[] = [];
	private spellLevels: any[] = [];
	private spells;

	private words: WordService;

	constructor(
		calculator: CalculatorService,
		formBuilder: FormBuilder,
		changeDetector: ChangeDetectorRef,
		snackBar: MatSnackBar,
		words: WordService
	) {
		super(calculator, formBuilder, changeDetector, snackBar);
		this.words = words;
	}

	onFormChanges(form: any): void {
		let spellLevel = parseInt(this.formGroup.controls["spellLevel"].value);
		const spellClass = this.formGroup.controls["spellClass"].value;

		if (spellLevel < 1) {
			spellLevel = 1;
			this.formGroup.controls["spellLevel"].setValue(1, { emitEvent: false });
		} else if (spellLevel > 20) {
			spellLevel = 20;
			this.formGroup.controls["spellLevel"].setValue(20, { emitEvent: false });
		}

		if (
			spellClass !==
			((this.monster.traits.spells as spellcasting).classInstance
				.baseClass as spellcastingClass).name
		) {
			let classType: baseClass;

			switch (spellClass) {
				case "Bard":
					classType = new bard();
					break;

				case "Cleric":
					classType = new cleric();
					break;

				case "Druid":
					classType = new druid();
					break;

				case "Paladin":
					classType = new paladin();
					break;

				case "Ranger":
					classType = new ranger();
					break;

				case "Sorcerer":
					classType = new sorcerer();
					break;

				case "Warlock":
					classType = new warlock();
					break;

				case "Wizard":
					classType = new wizard();
					break;
			}

			this.monster.traits.spells = new spellcasting(
				new classInstance(classType, spellLevel),
				[]
			);
		}

		this.spellAllotment = [];
		//this.getSpellSlots();
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

		let newTrait = new trait(name, desc);

		const traits = this.monster.traits.traits;
		for (let i = 0; i < traits.length; i++)
			if (traits[i].name === newTrait.name) {
				this.monster.traits.traits[i].description = desc;
				newTrait = null;
			}

		if (newTrait) this.monster.traits.traits.push(newTrait);
		this.triggerFormChange();

		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private removeTrait(traitName: string) {
		let index = -1;

		for (let i = 0; i < this.monster.traits.traits.length; i++)
			if (this.monster.traits.traits[i].name === traitName) index = i;

		if (index >= 0) this.monster.traits.traits.splice(index, 1);

		const nameInput = this.formGroup.controls["trait_name"];
		const descInput = this.formGroup.controls["trait_desc"];
		if (nameInput) nameInput.setValue("");
		if (descInput) descInput.setValue("");
	}

	private showTrait(trait: trait) {
		this.formGroup.controls["trait_name"].setValue(trait.name);
		this.formGroup.controls["trait_desc"].setValue(trait.description);
	}

	private changeSpellcastingType(newType: number): void {
		switch (newType) {
			case 0:
				this.monster.traits.spells = new spells();
				break;

			case 1:
				this.monster.traits.spells = new spellcasting(
					new classInstance(new bard(), 1),
					[]
				);
				break;

			case 2:
				this.monster.traits.spells = new Innate();
				break;

			case 3:
				this.monster.traits.spells = new Psionics();
				break;
		}
	}

	private getSpellSlots(): void {
		const instance = (this.monster.traits.spells as spellcasting).classInstance;
		const base = instance.baseClass as spellcastingClass;
		const slotAllotment = base.spellAdvancement[instance.level - 1];

		this.spellLevels = [];
		this.spellLevels.push({
			Name: "Cantrips",
			Slots: base.cantrips[instance.level]
		});

		for (let i = 0; i < slotAllotment.length; i++) {
			if (slotAllotment[i] === 0) continue;
			this.spellLevels.push({
				Name: i + 1 + this.words.getSuffix(i) + " Level",
				Slots: slotAllotment[i]
			});
		}
	}
}
