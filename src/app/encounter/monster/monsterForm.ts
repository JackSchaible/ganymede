import {
	Input,
	Output,
	ViewChild,
	Component,
	OnInit,
	ChangeDetectorRef
} from "@angular/core";
import monster from "../../common/models/monster/monster";
import { MonsterCardComponent } from "../../common/monster-card/monster-card.component";
import { CalculatorService } from "../../services/calculator.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
	selector: "gm-monster-form"
})
export default abstract class MonsterForm implements OnInit {
	@Input()
	@Output()
	public monster: monster;

	@Input()
	@Output()
	private complete: boolean;

	@ViewChild(MonsterCardComponent)
	protected card: MonsterCardComponent;

	protected formGroup: FormGroup;
	protected abstract form: any;

	constructor(
		protected calculator: CalculatorService,
		protected formBuilder: FormBuilder,
		protected changeDetector: ChangeDetectorRef,
		private snackBar: MatSnackBar
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.valueChanges.subscribe(form => this.formChange(form));
	}

	protected openSnackBar(message: string) {
		const sb = this.snackBar.open(message);

		setTimeout(() => {
			sb.dismiss();
		}, 3000);
	}

	protected formChange(form: any): void {
		this.card.calculateValues();
		this.onFormChanges(form);

		this.complete = this.isComplete();
	}

	protected triggerFormChange() {
		if (this.formGroup)
			this.formGroup.updateValueAndValidity({
				onlySelf: false,
				emitEvent: true
			});
	}

	protected abstract onFormChanges(form: any): void;

	protected abstract isComplete(): boolean;
}
