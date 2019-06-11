import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginResponse } from "../models/loginResponse";
import { AuthActions } from "../store/actions";
import { IAppState } from "src/app/models/core/IAppState";
import { NgRedux } from "@angular-redux/store";

@Component({
	selector: "gm-login",
	templateUrl: "./login.component.html",
	styleUrls: ["../auth.scss"]
})
export class LoginComponent implements OnInit {
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

	loginForm: FormGroup = new FormGroup({
		email: this.email,
		password: this.password
	});

	constructor(
		private authService: AuthService,
		private router: Router,
		private ngRedux: NgRedux<IAppState>,
		private actions: AuthActions
	) {}

	ngOnInit() {
		this.loginForm.valueChanges.subscribe(() => {
			this.canSubmit = this.loginForm.valid;
		});
	}

	submit() {
		if (this.loginForm.valid) {
			this.authService.login(this.email.value, this.password.value).subscribe(
				(loginResponse: LoginResponse) => {
					if (loginResponse) {
						this.ngRedux.dispatch(this.actions.loggedIn(loginResponse.user));

						const rUrl = this.authService.redirectUrl
							? this.authService.redirectUrl
							: "/";

						this.router.navigate([rUrl]);
					} else {
						this.authError = true;
					}
				},
				() => {
					this.authError = true;
				}
			);
		}
	}
}
