import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppUser } from "src/app/models/core/AppUser";
import { loggedIn } from "../store/auth.actions";
import { LoginResponse } from "../models/loginResponse";

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
		private store: Store<AppUser>
	) {}

	ngOnInit() {
		this.loginForm.valueChanges.subscribe(() => {
			this.canSubmit = this.loginForm.valid;
		});
	}

	submit() {
		if (this.loginForm.valid) {
			this.authService.login(this.email.value, this.password.value).subscribe(
				(e: LoginResponse) => {
					if (e) {
						this.store.dispatch(loggedIn(e.user));

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
