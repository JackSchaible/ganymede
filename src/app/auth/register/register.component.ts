import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "register",
	templateUrl: "./register.component.html",
	styleUrls: ["../auth.scss"]
})
export class RegisterComponent implements OnInit {
	canSubmit: boolean = false;
	authError: boolean = false;

	email: FormControl = new FormControl("", [
		Validators.required,
		Validators.email
	]);
	password: FormControl = new FormControl("", [
		Validators.required,
		Validators.minLength(6),
		Validators.pattern(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
	]);

	confirmPassword: FormControl = new FormControl("", []);

	loginForm: FormGroup = new FormGroup({
		email: this.email,
		password: this.password,
		confirmPassword: this.confirmPassword
	});

	constructor(private authService: AuthService, private router: Router) {}

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
		console.log();
		return this.password.hasError("required")
			? "A value must be entered."
			: this.password.hasError("minlength")
				? "Your password must be at least 6 characters long."
				: this.password.hasError("pattern")
					? "Your password must contain 1 special character."
					: "";
	}
	private getPasswordConfirmErrorMessage() {}
	//#endregion
}
