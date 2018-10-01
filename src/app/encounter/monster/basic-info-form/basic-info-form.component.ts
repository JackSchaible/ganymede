import { Component, OnInit, Input, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import Values, { ISize, IMonsterType } from "../../../common/models/values";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import monster from "../../../common/models/monster";
import { CalculatorService } from "../../../services/calculator.service";

@Component({
	selector: "gm-basic-info-form",
	templateUrl: "./basic-info-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class BasicInfoFormComponent implements OnInit {
	@Input()
	@Output()
	public monster: monster;

	@Input()
	public OnChange: any;

	@Input()
	public OpenSnackbar: any;

	private basicInfoFormGroup: FormGroup;
	private sizes: ISize[] = Values.Sizes;
	private types: IMonsterType[] = Values.Types;
	private selectedType: IMonsterType;
	private separatorKeysCodes: number[] = [ENTER, COMMA];

	constructor(
		private calculator: CalculatorService,
		private formBuilder: FormBuilder
	) {
		this.alignmentChanged = this.alignmentChanged.bind(this);
	}

	ngOnInit() {
		this.basicInfoFormGroup = this.formBuilder.group({
			name: [],
			size: [],
			type: [],
			prof: []
		});

		this.basicInfoFormGroup.valueChanges.subscribe(form =>
			this.basicInfoFormChange(form)
		);
	}

	private basicInfoFormChange(form) {
		this.OnChange();

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
			else this.OpenSnackbar("That tag already exists!");
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

		this.OnChange();
	}
}
