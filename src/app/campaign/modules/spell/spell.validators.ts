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
			const errors: any = {};
			const castingTime = control as FormGroup;
			const unit = castingTime.controls["unit"].value;

			if (unit && unit === "reaction") {
				const reaction =
					castingTime.controls["reactionCondition"].value;
				const hasValue = !words.isEmptyOrSpaces(reaction);

				if (!hasValue)
					castingTime.controls[
						"reactionCondition"
					].errors.requied = true;
			}

			return errors;
		};
	}

	public static validateRange(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const errors: any = {};
			const range = control as FormGroup;
			const type = range.controls["type"].value;

			if (
				type === "Touch" ||
				type === "Special" ||
				type === "Sight" ||
				type === "Unlimited"
			)
				return errors;

			const amount = range.controls["amount"].value;
			const unit = range.controls["unit"].value;

			if (type === "Self" || type === "Ranged") {
				if (!unit) errors["range.unit"] = "A unit is required";
				if (!amount) errors["range.amount"] = "An amount is required.";

				if (
					type === "Self" &&
					words.isEmptyOrSpaces(range.controls["shape"].value)
				)
					errors["range.shape"] = "A shape is required";
			} else errors["range.type"] = "Invalid range type!";

			return errors;
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
						if (words.isEmptyOrSpaces(materials[i].value.name))
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
}
