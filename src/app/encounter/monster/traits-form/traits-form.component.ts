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

	private spellClasses = Values.SpellClasses;
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

	private getSpellSlots(): void {
		const instance = (this.monster.Traits.Spells as Spellcasting).ClassInstance;
		const base = instance.BaseClass as SpellcastingClass;
		const slotAllotment = base.SpellAdvancement[instance.Level - 1];

		this.spellLevels = [];
		this.spellLevels.push({
			Name: "Cantrips",
			Slots: base.Cantrips[instance.Level]
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
