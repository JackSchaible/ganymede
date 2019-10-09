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
			const type = castingTime.controls["type"].value;

			if (type === "Reaction") {
				const reaction =
					castingTime.controls["reactionCondition"].value;

				if (words.isNullOrWhitespace(reaction))
					castingTime.controls["reactionCondition"].setErrors({
						required: true
					});
			} else if (type === "Time") {
				const amount = castingTime.controls["amount"];
				const unit = castingTime.controls["unit"];

				this.validateAmountAndUnit(words, amount, unit);
			}

			return {};
		};
	}

	public static validateRange(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const range = control as FormGroup;
			const type = range.controls["type"];

			if (
				type.value === "Touch" ||
				type.value === "Special" ||
				type.value === "Sight" ||
				type.value === "Unlimited"
			)
				return {};

			if (type.value === "Self" || type.value === "Ranged") {
				const amount = range.controls["amount"];
				const unit = range.controls["unit"];

				this.validateAmountAndUnit(words, amount, unit);

				if (type.value === "Self") {
					const shape = range.controls["shape"];

					if (words.isNullOrWhitespace(shape.value))
						shape.setErrors({ required: true });
				}
			} else type.setErrors({ required: true });

			return {};
		};
	}

	public static validateComponents(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const errors: any = {};
			const components = control as FormGroup;

			const hasMaterial = components.controls["material"].value;

			if (hasMaterial) {
				const materials = (components.controls["material"] as FormArray)
					.controls;

				if (materials.length > 0)
					for (let i = 0; i < materials.length; i++)
						if (words.isNullOrWhitespace(materials[i].value.name))
							errors[`components.materials.${i}`] =
								"Material must have a value.";
			}

			return errors;
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
}
