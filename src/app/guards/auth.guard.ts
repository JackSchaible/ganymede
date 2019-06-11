import { Injectable } from "@angular/core";
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../auth/auth.service";
import { User } from "../auth/models/user";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser: User = this.authenticationService.getUser();
		if (currentUser) return true;

		this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
