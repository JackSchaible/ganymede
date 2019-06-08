import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import NavItem from "../../models/nav/navItem";
import { Md5 } from "ts-md5/dist/md5";
import { filter } from "rxjs/operators";

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
	campaignItems: NavItem[];

	currentItems: NavItem[];

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

		this.router.events
			.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) =>
				this.configureItems(event.urlAfterRedirects)
			);
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

	private configureItems(url: string) {
		const matches = url.match(/campaign\/[0-9]+/g);

		if (matches && matches.length > 0) {
			const searchStr = "campaign/";
			const match: string = matches[0];
			const campaignIndex = match.indexOf(searchStr) + searchStr.length;
			if (campaignIndex >= 0) {
				const id = parseInt(
					match.substr(campaignIndex, match.length - campaignIndex),
					10
				);
				this.campaignItems = [
					new NavItem("", "fab fa-d-and-d", "DM Tools", true),
					new NavItem(
						`campaign/${id}`,
						"fas fa-scroll",
						"The Campaign",
						false,
						[new NavItem(`campaign/edit/${id}`, "fas fa-pencil", "Edit")]
					),
					new NavItem(`campaign/${id}/monsters`, "fas fa-paw-claws", "Monsters")
				];

				this.currentItems = this.campaignItems;
			}
		} else this.currentItems = this.items;
	}
}
