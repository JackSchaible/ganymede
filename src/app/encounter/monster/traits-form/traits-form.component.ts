import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CalculatorService } from "../../../services/calculator.service";
import { MatSnackBar } from "@angular/material";
import MonsterForm from "../monsterForm";
import Values from "../../../common/models/values";
import Trait from "src/app/common/models/monster/traits/trait";
import {
	Spells,
	Spellcasting,
	Innate,
	Psionics
} from "src/app/common/models/monster/traits/spells/spells";
import ClassInstance from "src/app/common/models/monster/classes/ClassInstance";
import Bard from "src/app/common/models/monster/classes/Bard/Bard";

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
	private spells;

	constructor(
		calculator: CalculatorService,
		formBuilder: FormBuilder,
		changeDetector: ChangeDetectorRef,
		snackBar: MatSnackBar
	) {
		super(calculator, formBuilder, changeDetector, snackBar);
	}

	onFormChanges(form: any): void {}

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
