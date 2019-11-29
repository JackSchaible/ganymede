import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CRFormModel } from "../models/crFormModel";
import { CRService } from "../services/cr.service";

@Component({
	selector: "gm-cr-calculator",
	templateUrl: "./cr-calculator.component.html",
	styleUrls: ["./cr-calculator.component.scss"]
})
export class CrCalculatorComponent implements OnInit {
	public challengeRating: number = 0;
	public xp: number = 0;

	public bab = new FormControl("", Validators.required);
	public ac = new FormControl("", Validators.required);
	public hp = new FormControl("", Validators.required);
	public dps = new FormControl("", Validators.required);

	public crForm: FormGroup = new FormGroup({
		bab: this.bab,
		ac: this.ac,
		hp: this.hp,
		dps: this.dps
	});

	constructor(private crService: CRService) {}

	public ngOnInit() {
		this.crForm.valueChanges
			.pipe(
				debounceTime(250),
				distinctUntilChanged(
					(a: CRFormModel, b: CRFormModel): boolean => {
						return CRFormModel.isEqual(a, b);
					}
				)
			)
			.subscribe((model: CRFormModel) => {
				if (this.crForm.valid) {
					this.challengeRating = this.crService.calculateCr(
						model.hp,
						model.ac,
						model.dps,
						model.bab
					);
				}
			});
	}
}
