import { Component, Input, OnChanges } from "@angular/core";

@Component({
	selector: "validation-message",
	templateUrl: "./validation-message.component.html",
	styleUrls: ["./validation-message.component.scss"]
})
export class ValidationMessageComponent implements OnChanges {
	@Input()
	public errors: any[];

	@Input()
	public show: boolean;

	@Input()
	public patternMessage: string;

	@Input()
	public name: string;

	public errorMessages: string[];

	constructor() {
		this.errorMessages = [];
	}

	ngOnChanges() {
		this.errorMessages = [];

		if (!this.errors || !this.show) return;

		if (this.errors["required"] === true)
			this.errorMessages.push("A value must be entered.");

		if (this.errors["email"] === true)
			this.errorMessages.push(
				"${this.name} doesn't look like an email address. Exmaple: someone@email.com"
			);

		if (this.errors["minlength"])
			this.errorMessages.push(
				`${this.name} must be at least ${
					this.errors["minlength"].requiredLength
				} characters long.`
			);

		if (this.errors["pattern"] && this.patternMessage)
			this.errorMessages.push(this.patternMessage);

		if (this.errors["passMatch"])
			this.errorMessages.push("Your password and confirmation password must match!");

		// There are errors, but no known ones
		if (this.errorMessages.length === 0)
			this.errorMessages.push(
				"There are one or more problems with this field."
			);
	}
}
