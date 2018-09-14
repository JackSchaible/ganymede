import {
	Directive,
	TemplateRef,
	ViewContainerRef,
	OnInit
} from "@angular/core";
import { AuthService } from "../services/auth.service";

abstract class AuthStatusDirective implements OnInit {
	public constructor(
		protected authService: AuthService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	public ngOnInit() {
		this.viewContainer.clear();
		if (this.shouldShow())
			this.viewContainer.createEmbeddedView(this.templateRef);
	}

	protected abstract shouldShow(): boolean;
}

@Directive({
	selector: "[isLoggedIn]"
})
export class IsLoggedInDirective extends AuthStatusDirective implements OnInit {
	public constructor(
		authService: AuthService,
		templateRef: TemplateRef<any>,
		viewContainer: ViewContainerRef
	) {
		super(authService, templateRef, viewContainer);
	}

	protected shouldShow(): boolean {
		return !!this.authService.getUser();
	}

	public ngOnInit() {
		super.ngOnInit();
	}
}

@Directive({
	selector: "[isLoggedOut]"
})
export class IsLoggedOutDirective extends AuthStatusDirective
	implements OnInit {
	public constructor(
		authService: AuthService,
		templateRef: TemplateRef<any>,
		viewContainer: ViewContainerRef
	) {
		super(authService, templateRef, viewContainer);
	}

	protected shouldShow(): boolean {
		return !this.authService.getUser();
	}

	public ngOnInit() {
		super.ngOnInit();
	}
}
