import { Component, OnInit, Input, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CalculatorService } from "../../../services/calculator.service";
import Monster from "../../../common/models/monster";

@Component({
	selector: "gm-traits-form",
	templateUrl: "./traits-form.component.html",
	styleUrls: ["../monster.component.scss"]
})
export class TraitsFormComponent implements OnInit {
	@Input()
	@Output()
	public monster: Monster;

	@Input()
	public OnChange: any;

	@Input()
	public OpenSnackbar: any;

	constructor(
		private formBuilder: FormBuilder,
		private calculator: CalculatorService
	) {}

	ngOnInit() {}
}
