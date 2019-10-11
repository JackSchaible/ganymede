import { WordService } from "src/app/services/word.service";
import {
	ValidatorFn,
	AbstractControl,
	ValidationErrors,
	FormGroup,
	FormArray
} from "@angular/forms";

export class SpellFormValidators {
	public static validateCastingTime(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const castingTime = control as FormGroup;
			const type = castingTime.get("type").value;
			const amount = castingTime.get("amount");
			const unit = castingTime.get("unit");

			this.clearAmountAndUnitErrors(amount, unit);
			if (type === "Reaction")
				this.validateRequired(
					words,
					castingTime.controls["reactionCondition"]
				);
			else {
				castingTime.get("reactionCondition").setErrors(null);

				if (type === "Time")
					this.validateAmountAndUnit(words, amount, unit);
			}

			return {};
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
				return {};

			if (type.value === "Self" || type.value === "Ranged") {
				this.validateAmountAndUnit(words, amount, unit);

				if (type.value === "Self")
					this.validateRequired(words, range.controls["shape"]);
			} else type.setErrors({ required: true });

			return {};
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

			return {};
		};
	}

	public static validateDuration(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const errors: any = {};
			const duration = control as FormGroup;
			const type = duration.controls["type"].value;

			if (type === "Duration") {
				const amount = duration.controls["amount"].value;
				const unit = duration.controls["unit"].value;

				if (!amount)
					errors["duration.amount"] = "An amount is required.";
				if (!unit) errors["duration.unit"] = "A duration is required.";
			} else if (type === "Until") {
				const dispelled = duration.controls["untilDispelled"].value;
				const triggered = duration.controls["untilTriggered"].value;

				if (!dispelled && !triggered)
					errors["duration.until"] =
						"Until must have either triggered, dispelled, or both.";
			}

			return errors;
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

		if (words.isNullOrWhitespace(unit.value))
			unit.setErrors({
				required: true
			});
	}
	private static validateRequired(
		words: WordService,
		control: AbstractControl
	) {
		if (words.isNullOrWhitespace(control.value))
			control.setErrors({ required: true });
	}
}
