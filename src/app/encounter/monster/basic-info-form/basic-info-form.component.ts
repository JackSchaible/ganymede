import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import Values, { ISize, IMonsterType } from "../../../common/models/values";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { CalculatorService } from "../../../services/calculator.service";
import { MonsterFormComponent } from "../monsterFormComponent";
import { MatSnackBar } from "@angular/material";

@Component({
	selector: "gm-basic-info-form",
	templateUrl: "./basic-info-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class BasicInfoFormComponent extends MonsterFormComponent {
	protected form = {
		name: [],
		size: [],
		type: [],
		prof: []
	};

	public sizes: ISize[] = Values.Sizes;
	public types: IMonsterType[] = Values.Types;
	public selectedType: IMonsterType;
	public separatorKeysCodes: number[] = [ENTER, COMMA];

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
				if (this.types[i].Name === form.type) this.selectedType = this.types[i];
	}

	isComplete(): boolean {
		return false;
	}

	public addTag(event) {
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

	public removeTag(tag: string) {
		const index = this.monster.BasicInfo.Tags.indexOf(tag);
		if (index >= 0) this.monster.BasicInfo.Tags.splice(index, 1);
	}

	public alignmentChanged() {
		this.triggerFormChange();
		this.card.CalculateValues();
	}
}
