import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import { Md5 } from "ts-md5/dist/md5";
import { filter } from "rxjs/operators";
import NavItem from "../models/navItem";
import { Observable } from "rxjs";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { AppUser } from "src/app/models/core/appUser";
import { AuthActions } from "src/app/auth/store/actions";
import {
	BreakpointObserver,
	BreakpointState,
	Breakpoints
} from "@angular/cdk/layout";

@Component({
	selector: "gm-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;

	@select() public user$: Observable<AppUser>;

	public userHash: string;
	public loggedIn: boolean;

	items: NavItem[];
	campaignItems: NavItem[];

	currentItems: NavItem[];

	constructor(
		private authService: AuthService,
		private breakpointObserver: BreakpointObserver,
		private router: Router,
		private redux: NgRedux<IAppState>,
		private actions: AuthActions
	) {
		breakpointObserver
			.observe([Breakpoints.Handset])
			.subscribe((result: BreakpointState) => {
				this.isMobile = result.matches;
			});

		breakpointObserver
			.observe([Breakpoints.Tablet])
			.subscribe((result: BreakpointState) => {
				this.isTablet = result.matches;
			});

		breakpointObserver
			.observe([Breakpoints.Large, Breakpoints.XLarge])
			.subscribe((result: BreakpointState) => {
				this.isDesktop = result.matches;
			});

		this.items = [
			new NavItem("", "fab fa-d-and-d", "DM Tools", true),
			new NavItem("", "fa fa-home", "Home"),
			new NavItem("CRCalculator", "fa fa-calculator", "CR Calculator"),
			new NavItem("encounter", "fas fa-helmet-battle", "Encounters"),
			new NavItem("campaigns", "fas fa-scroll", "Campaigns")
		];

		this.user$.subscribe((user: AppUser) => {
			this.loggedIn = user && !!user.email;
			if (!this.loggedIn) return;

			this.userHash = Md5.hashStr(user.email) as string;
		});
	}

	ngOnInit(): void {
		this.router.events
			.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) =>
				this.configureItems(event.urlAfterRedirects)
			);
	}

	logout() {
		this.authService.logout();
		this.router.navigateByUrl("/");
		this.redux.dispatch(this.actions.loggedOut());
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
