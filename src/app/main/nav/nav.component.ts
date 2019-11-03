import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { CampaignActions } from "src/app/campaign/store/actions";
import KeyboardBaseComponent from "src/app/common/baseComponents/keyboardBaseComponents";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";
import { Key } from "ts-key-enum";

@Component({
	selector: "gm-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"]
})
export class NavComponent extends KeyboardBaseComponent
	implements OnInit, OnDestroy {
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
		private router: Router,
		private store: NgRedux<IAppState>,
		private authActions: AuthActions,
		private campaignActions: CampaignActions,
		breakpointObserver: BreakpointObserver,
		keyboardService: KeyboardService
	) {
		super(keyboardService);
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
	}

	public ngOnInit() {
		super.ngOnInit();
		this.user$.subscribe((user: AppUser) => {
			this.loggedIn = user && !!user.email;
			if (!this.loggedIn) return;

			this.userHash = Md5.hashStr(user.email) as string;
		});

		this.router.events
			.pipe(
				filter((event: RouterEvent) => event instanceof NavigationEnd)
			)
			.subscribe((event: NavigationEnd) =>
				this.configureItems(event.urlAfterRedirects)
			);
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}

	logout() {
		this.authService.logout();
		this.router.navigateByUrl("/");
		this.store.dispatch(this.authActions.loggedOut());
	}

	private configureItems(url: string) {
		if (url === "/") {
			this.store.dispatch(this.campaignActions.deselectCampaign());
			this.currentItems = this.items;
		} else {
			const state = this.store.getState();
			if (state.app.campaign && state.app.campaign.id) {
				const id = this.store.getState().app.campaign.id;
				this.campaignItems = [
					new NavItem("", "fab fa-d-and-d", "DM Tools", true),
					new NavItem(
						`campaigns/${id}`,
						"fas fa-scroll",
						"The Campaign",
						false,
						[
							new NavItem(
								`campaigns/edit/${id}`,
								"fas fa-pencil",
								"Edit"
							)
						]
					),
					new NavItem(
						`campaigns/${id}/monsters`,
						"fas fa-paw-claws",
						"Monsters"
					),
					new NavItem(
						`campaigns/${id}/spells`,
						"fas fa-book-spells",
						"Spells"
					)
				];
				this.currentItems = this.campaignItems;
			} else this.currentItems = this.items;
		}

		this.keySubscriptions = [];
		for (let i = 0; i < this.currentItems.length; i++) {
			if (this.currentItems[i].isBrand) continue;
			this.keySubscriptions.push({
				// @ts-ignore 2322
				key: i.toString(),
				modifierKeys: [Key.Control],
				callbackFn: () => {
					this.router.navigateByUrl(this.currentItems[i].url);
				}
			});
		}
		this.keySubscriptions.push({
			key: "l",
			modifierKeys: [Key.Control],
			callbackFn: () => {
				if (this.loggedIn) this.logout();
				else this.router.navigateByUrl("/login");
			}
		});
		this.keySubscriptions.push({
			key: "h",
			modifierKeys: [Key.Control],
			callbackFn: () => this.router.navigateByUrl("/")
		});
	}
}
