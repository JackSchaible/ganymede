import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import NavItem from "../../models/nav/navItem";

@Component({
	selector: "gm-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"]
})
export class NavComponent {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	user: string;

	items: NavItem[];

	constructor(
		private authService: AuthService,
		private deviceService: DeviceDetectorService,
		private router: Router
	) {
		this.isMobile = this.deviceService.isMobile();
		this.isTablet = this.deviceService.isTablet();
		this.isDesktop = this.deviceService.isDesktop();

		this.items = [
			new NavItem("", "fab fa-d-and-d", "DM Tools", true),
			new NavItem("", "fa fa-home", "Home"),
			new NavItem("CRCalculator", "fa fa-calculator", "CR Calculator"),
			new NavItem("encounter", "fas fa-helmet-battle", "Encounters")
		];
	}

	getUsername(): string {
		let user: string = null;
		const u = this.authService.getUser();
		if (u) user = u.user;

		return user;
	}

	logout() {
		this.authService.logout();
		this.router.navigateByUrl("/");
	}

	isLoggedIn(): boolean {
		return this.authService.getUser();
	}
}
