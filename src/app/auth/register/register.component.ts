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

	loginForm: FormGroup = new FormGroup({
		email: this.email,
		password: this.password
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
}
