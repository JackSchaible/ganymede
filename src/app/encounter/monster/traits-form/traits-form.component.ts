import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CalculatorService } from "../../../services/calculator.service";
import { MatSnackBar } from "@angular/material";
import MonsterForm from "../mosnterForm";

@Component({
	selector: "gm-traits-form",
	templateUrl: "./traits-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class TraitsFormComponent extends MonsterForm {
	protected form = {};

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
}
