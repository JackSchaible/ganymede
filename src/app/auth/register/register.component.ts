import { Component, OnInit } from "@angular/core";
import {
	FormControl,
	Validators,
	FormGroup,
	FormGroupDirective,
	NgForm,
	FormBuilder
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";
import ApiError from "../../services/http/apiError";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { AuthActions } from "../store/actions";
import { LoginResponse } from "../models/loginResponse";

export class GmErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
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

@Component({
	selector: "gm-register",
	templateUrl: "./register.component.html",
	styleUrls: ["../auth.scss"]
})
export class RegisterComponent implements OnInit {
	canSubmit: boolean = false;
	errorMatcher: GmErrorStateMatcher = new GmErrorStateMatcher();

	email: FormControl = new FormControl("", [
		Validators.required,
		Validators.email
	]);
	password: FormControl = new FormControl("", [
		Validators.required,
		Validators.minLength(6),
		Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
	]);
	confirmPassword: FormControl = new FormControl();

	registerForm: FormGroup;

	serverErrors: string[];

	constructor(
		private authService: AuthService,
		private router: Router,
		private formBuilder: FormBuilder,
		private ngRedux: NgRedux<IAppState>,
		private actions: AuthActions
	) {
		this.registerForm = this.formBuilder.group(
			{
				email: this.email,
				password: this.password,
				confirmPassword: this.confirmPassword
			},
			{
				validator: this.ValidateConfirmPassword
			}
		);

		this.serverErrors = [];
	}

	ngOnInit() {
		this.registerForm.valueChanges.subscribe(() => {
			this.canSubmit = this.registerForm.valid;
		});
	}

	submit() {
		if (this.registerForm.valid) {
			this.serverErrors = [];
			this.authService
				.register(this.email.value, this.password.value)
				.subscribe((loginResponse: LoginResponse) => {
					if (loginResponse.success) {
						this.ngRedux.dispatch(this.actions.loggedIn(loginResponse.user));

						let rUrl = this.authService.redirectUrl
							? this.authService.redirectUrl
							: "/";

						this.router.navigate([rUrl]);
					} else {
						this.processErrors(loginResponse.errors);
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
			? "Your password must contain 1 uppercase character, 1 lowercase character, and 1 special character."
			: "";
	}
	private getPasswordConfirmErrorMessage() {
		return this.registerForm.hasError("notSame")
			? "Confirm Password must be the same as Password."
			: "";
	}
	private processErrors(errors: ApiError[]) {
		for (let i = 0; i < errors.length; i++) {
			switch (errors[i].errorCode) {
				case "NOT_UNIQUE":
					this.serverErrors.push("Your username is already in use.");
					break;
			}
		}
	}
	ValidateConfirmPassword(group: FormGroup) {
		let pass = group.controls.password.value;
		let confirmPass = group.controls.confirmPassword.value;

		return pass === confirmPass ? null : { notSame: true };
	}
	//#endregion
}
