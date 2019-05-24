import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import NavItem from "../../models/nav/navItem";
import { Md5 } from "ts-md5/dist/md5";

@Component({
	selector: "gm-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	user: string;
	userHash: string;

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
			new NavItem("encounter", "fas fa-helmet-battle", "Encounters"),
			new NavItem("campaigns", "fas fa-scroll", "Campaigns")
		];
	}

	ngOnInit(): void {
		this.user = this.getUsername();

		if (this.user) this.userHash = Md5.hashStr(this.user) as string;
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
		return !!this.authService.getUser();
	}
}
