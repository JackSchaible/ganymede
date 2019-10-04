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
					errors["reaction"] =
						"Reaction condition must have a value.";
			}

			return errors;
		};
	}

	public static validateRange(control: AbstractControl): ValidationErrors {
		const errors: any = {};
		const range = control as FormGroup;
		const type = range.controls["type"].value;

		if (
			type === "touch" ||
			type === "special" ||
			type === "sight" ||
			type === "unlimited"
		)
			return errors;

		const amount = range.controls["amount"].value;
		const unit = range.controls["unit"].value;

		if (type === "self" || type === "ranged") {
			if (!unit) errors["unit"] = "A unit is required";
			if (!amount) errors["amount"] = "An amount is required.";
		} else errors["type"] = "Invalid range type!";

		return errors;
	}

	public static validateComponents(words: WordService): ValidatorFn {
		return (control: AbstractControl): ValidationErrors => {
			const errors: any = {};
			// const components = control as FormGroup;

			// const hasMaterial = components.controls["material"].value;

			// if (hasMaterial) {
			// 	const materials = (components.controls[
			// 		"materials"
			// 	] as FormArray).controls;

			// 	if (materials.length === 0)
			// 		errors["material"] =
			// 			"Which material components are required to cast this spell?";
			// 	else
			// 		for (let i = 0; i < materials.length; i++)
			// 			if (words.isEmptyOrSpaces(materials[i].value.name))
			// 				errors[`materials.${i}`] =
			// 					"Material must have a value.";
			// }

			return errors;
		};
	}

	public static validateDuration(control: AbstractControl): ValidationErrors {
		const errors: any = {};

		return errors;
	}
}
