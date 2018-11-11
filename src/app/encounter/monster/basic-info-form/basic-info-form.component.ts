import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import values, { size, monsterType } from "../../../common/models/values";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { CalculatorService } from "../../../services/calculator.service";
import MonsterForm from "../monsterForm";
import { MatSnackBar } from "@angular/material";

@Component({
	selector: "gm-basic-info-form",
	templateUrl: "./basic-info-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class BasicInfoFormComponent extends MonsterForm {
	protected form = {
		name: [],
		size: [],
		type: [],
		prof: []
	};

	private sizes: size[] = values.sizes;
	private types: monsterType[] = values.types;
	private selectedType: monsterType;
	private separatorKeysCodes: number[] = [ENTER, COMMA];

	constructor(
		calculator: CalculatorService,
		formBuilder: FormBuilder,
		changeDetector: ChangeDetectorRef,
		snackbar: MatSnackBar
	) {
		super(calculator, formBuilder, changeDetector, snackbar);
		this.alignmentChanged = this.alignmentChanged.bind(this);
	}

	onFormChanges(form) {
		if (form.type)
			for (let i = 0; i < this.types.length; i++)
				if (this.types[i].name === form.type) this.selectedType = this.types[i];
	}

	isComplete(): boolean {
		return false;
	}

	private addTag(event) {
		const input = event.input;
		let value = event.value;

		if (value) {
			value = value.trim();

			if (this.monster.basicInfo.tags.indexOf(value) === -1)
				this.monster.basicInfo.tags.push(value);
			else this.openSnackBar("That tag already exists!");
		}

		if (input) input.value = "";
	}

	private removeTag(tag: string) {
		const index = this.monster.basicInfo.tags.indexOf(tag);
		if (index >= 0) this.monster.basicInfo.tags.splice(index, 1);
	}

	private alignmentChanged() {
		this.triggerFormChange();
		this.card.calculateValues();
	}
}
