import { WordService } from "src/app/services/word.service";
import {
	ValidatorFn,
	AbstractControl,
	ValidationErrors,
	FormGroup,
	FormArray,
	FormControl
} from "@angular/forms";
import { until } from "selenium-webdriver";

export class SpellFormValidators {
	public static validateCastingTime(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const castingTime = control as FormGroup;
			const type = castingTime.get("type");
			const amount = castingTime.get("amount");
			const unit = castingTime.get("unit");

			this.clearAmountAndUnitErrors(amount, unit);
			if (type.value === "Reaction")
				this.validateRequired(
					words,
					castingTime.controls["reactionCondition"]
				);
			else {
				castingTime.get("reactionCondition").setErrors(null);

				if (type.value === "Time")
					this.validateAmountAndUnit(words, amount, unit);
			}

			return null;
		};
	}

	public static validateRange(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const range = control as FormGroup;
			const type = range.get("type");
			const amount = range.get("amount");
			const unit = range.get("unit");

			this.clearAmountAndUnitErrors(amount, unit);
			range.get("shape").setErrors(null);

			if (
				type.value === "Touch" ||
				type.value === "Special" ||
				type.value === "Sight" ||
				type.value === "Unlimited"
			)
				return null;

			if (type.value === "Self" || type.value === "Ranged") {
				this.validateAmountAndUnit(words, amount, unit);

				if (type.value === "Self")
					this.validateRequired(words, range.controls["shape"]);
			} else type.setErrors({ required: true });

			return null;
		};
	}

	public static validateComponents(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const components = control as FormGroup;
			const verbal = components.controls["verbal"];
			verbal.setErrors(null);

			const hasMaterial: boolean =
				components.controls["material"].value &&
				(components.controls["material"].value as Array<string>)
					.length > 0;
			const hasSomatic: boolean = !!components.controls["somatic"].value;
			const hasVerbal: boolean = !!verbal.value;

			// set to the verbal checkbox, the error has to go somewhere not on the formgroup
			if (!hasVerbal && !hasSomatic && !hasMaterial)
				verbal.setErrors({ required: true });

			return null;
		};
	}

	public static validateDuration(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const duration = control as FormGroup;
			const type = duration.controls["type"];

			if (!type.value) type.setErrors({ required: true });
			else if (type.value === "Duration") {
				const amount = duration.controls["amount"].value;
				const unit = duration.controls["unit"].value;

				this.validateAmountAndUnit(words, amount, unit);
			} else if (type.value === "Until") {
				const dispelled = duration.controls["untilDispelled"];
				const triggered = duration.controls["untilTriggered"];

				if (!dispelled.value && !triggered.value)
					dispelled.setErrors({ required: true });
			}

			return null;
		};
	}

	private static clearAmountAndUnitErrors(
		amount: AbstractControl,
		unit: AbstractControl
	) {
		amount.setErrors(null);
		unit.setErrors(null);
	}
	private static validateAmountAndUnit(
		words: WordService,
		amount: AbstractControl,
		unit: AbstractControl
	) {
		if (words.isNullOrWhitespace(amount.value))
			amount.setErrors({
				required: true
			});
		else if (+amount.value <= 0)
			amount.setErrors({
				min: true
			});
		else amount.setErrors(null);

		if (words.isNullOrWhitespace(unit.value))
			unit.setErrors({
				required: true
			});
		else unit.setErrors(null);
	}
	private static validateRequired(
		words: WordService,
		control: AbstractControl
	) {
		if (words.isNullOrWhitespace(control.value))
			control.setErrors({ required: true });
	}
}
