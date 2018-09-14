import { Component, OnInit } from "@angular/core";
import {
	FormControl,
	Validators,
	FormGroup,
	FormGroupDirective,
	NgForm,
	FormBuilder
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
	selector: "register",
	templateUrl: "./register.component.html",
	styleUrls: ["../auth.scss"]
})
export class RegisterComponent implements OnInit {
	canSubmit: boolean = false;
	authError: boolean = false;
	errorMatcher: GmErrorStateMatcher = new GmErrorStateMatcher();

	email: FormControl = new FormControl("", [
		Validators.required,
		Validators.email
	]);
	password: FormControl = new FormControl("", [
		Validators.required,
		Validators.minLength(6),
		Validators.pattern(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
	]);

	confirmPassword: FormControl = new FormControl();

	loginForm: FormGroup;

	constructor(
		private authService: AuthService,
		private router: Router,
		private formBuilder: FormBuilder
	) {
		this.loginForm = this.formBuilder.group(
			{
				email: this.email,
				password: this.password,
				confirmPassword: this.confirmPassword
			},
			{
				validator: this.ValidateConfirmPassword
			}
		);
	}

	ngOnInit() {
		this.loginForm.valueChanges.subscribe(() => {
			this.canSubmit = this.loginForm.valid;
		});
	}

	submit() {
		if (this.loginForm.valid) {
			this.authService
				.login(this.email.value, this.password.value)
				.subscribe((e: boolean) => {
					if (e) {
						let rUrl = this.authService.redirectUrl
							? this.authService.redirectUrl
							: "/";

						this.router.navigate([rUrl]);
					} else {
						this.authError = true;
					}
				});
		}
	}

	//#region Validation
	private getEmailErrorMessage() {
		return this.email.hasError("required")
			? "A value must be entered."
			: this.email.hasError("email")
				? "Your email doesn't look like an email address."
				: "";
	}
	private getPasswordErrorMessage() {
		return this.password.hasError("required")
			? "A value must be entered."
			: this.password.hasError("minlength")
				? "Your password must be at least 6 characters long."
				: this.password.hasError("pattern")
					? "Your password must contain 1 special character."
					: "";
	}
	private getPasswordConfirmErrorMessage() {}
	ValidateConfirmPassword(group: FormGroup) {
		let pass = group.controls.password.value;
		let confirmPass = group.controls.confirmPassword.value;

		return pass === confirmPass ? null : { notSame: true };
	}
	//#endregion
}

export class GmErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const invalidCtrl = !!(
			control &&
			control.invalid &&
			control.parent.dirty
		);
		const invalidParent = !!(
			control &&
			control.parent &&
			control.parent.errors &&
			control.parent.errors["notSame"] &&
			control.parent.dirty
		);

		return invalidCtrl || invalidParent;
	}
}
