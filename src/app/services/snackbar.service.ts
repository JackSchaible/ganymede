import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../common/snackbar/snackbar.component";
import SnackbarModel from "../common/models/snackbarModel";
import { ApiResponse } from "./http/apiResponse";
import ApiCodes from "./http/apiCodes";

@Injectable({
	providedIn: "root"
})
export class SnackBarService {
	constructor(private snackBar: MatSnackBar) {}

	public showSuccess(
		response: ApiResponse,
		itemName: string,
		item: any,
		isNew: boolean,
		saveFunction: (item: any, wasNew: boolean) => void
	) {
		if (response) {
			if (response.statusCode === ApiCodes.Ok) {
				this.openSnackbar(
					"check-square",
					`${itemName} was successfully saved!`
				);

				const wasNew = isNew;

				if (isNew) {
					isNew = false;
					item.id = response.insertedID;
				}

				saveFunction(item, wasNew);
			} else
				this.openSnackbar(
					"exclamation-triangle",
					`An error occurred while saving ${itemName}!`
				);
		} else
			this.openSnackbar(
				"exclamation-triangle",
				`An error occurred while saving ${itemName}!`
			);
	}

	public showError(itemName: string) {
		this.openSnackbar(
			"exclamation-triangle",
			`An error occurred while saving ${itemName}!`
		);
	}

	private openSnackbar(icon: string, message: string): void {
		let textClass = "text-info";

		switch (icon) {
			case "check-square":
				textClass = "text-success";
				break;

			case "exclamation-triangle":
				textClass = "text-danger";
				break;
		}

		const options: SnackbarModel = {
			icon: icon,
			message: message,
			textClass: textClass
		};

		this.snackBar.openFromComponent(SnackbarComponent, {
			data: options,
			duration: 5000
		});
	}
}
