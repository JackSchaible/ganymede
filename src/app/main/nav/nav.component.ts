import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DeviceDetectorService } from "ngx-device-detector";

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

	items: NavItem[];

	constructor(
		private authService: AuthService,
		private deviceService: DeviceDetectorService
	) {
		this.isMobile = this.deviceService.isMobile();
		this.isTablet = this.deviceService.isTablet();
		this.isDesktop = this.deviceService.isDesktop();
		console.log(this.isMobile);
		console.log(this.isTablet);
		console.log(this.isDesktop);

		this.items = [
			new NavItem("", "fa fa-dice", "DM Tools", true),
			new NavItem("", "fa fa-home", "Home"),
			new NavItem("CRCalculator", "fa fa-calculator", "CR Calculator"),
			new NavItem("encounter", "fa fa-pastafarianism", "Encounters")
		];
	}

	ngOnInit() {
		const u = this.authService.getUser();
		if (u) this.user = u.user;
	}
}

class NavItem {
	public url: string;
	public icon: string;
	public label: string;
	public isBrand: boolean;

	constructor(
		url: string,
		icon: string,
		label: string,
		isBrand: boolean = false
	) {
		this.url = url;
		this.icon = icon;
		this.label = label;
		this.isBrand = isBrand;
	}
}
