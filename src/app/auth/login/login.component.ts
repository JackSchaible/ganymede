import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy
} from "@angular/core";
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LoginResponse } from "../models/loginResponse";
import { AuthActions } from "../store/actions";
import { IAppState } from "src/app/models/core/iAppState";
import { NgRedux } from "@angular-redux/store";
import KeyboardBaseComponent from "src/app/common/baseComponents/keyboardBaseComponents";
import { KeyboardService } from "src/app/services/keyboard.service";
import { Key } from "ts-key-enum";
import { Location } from "@angular/common";

@Component({
	selector: "gm-login",
	templateUrl: "./login.component.html",
	styleUrls: ["../auth.scss"]
})
export class LoginComponent extends KeyboardBaseComponent
	implements OnInit, OnDestroy {
	@ViewChild("email", { static: false })
	private emailEl: ElementRef;

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
		private actions: AuthActions,
		private route: ActivatedRoute,
		private location: Location,
		keyboardService: KeyboardService
	) {
		super(keyboardService);
	}

	public ngOnInit() {
		super.ngOnInit();

		this.loginForm.valueChanges.subscribe(() => {
			this.canSubmit = this.loginForm.valid;
		});

		this.keySubscriptions.push(
			{
				key: Key.Enter,
				modifierKeys: [],
				callbackFn: () => this.submit()
			},
			{
				key: Key.Backspace,
				modifierKeys: [Key.Alt],
				callbackFn: () => this.location.back()
			}
		);

		setTimeout(() => this.emailEl.nativeElement.focus(), 500);
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}

	submit() {
		if (this.loginForm.valid) {
			this.authService
				.login(this.email.value, this.password.value)
				.subscribe(
					(loginResponse: LoginResponse) => {
						if (loginResponse) {
							this.ngRedux.dispatch(
								this.actions.loggedIn(loginResponse.user)
							);

							this.route.queryParams.subscribe(
								(params: Params) => {
									const rUrl = params["returnUrl"]
										? params["returnUrl"]
										: "/";
									this.router.navigateByUrl(rUrl);
								}
							);
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
