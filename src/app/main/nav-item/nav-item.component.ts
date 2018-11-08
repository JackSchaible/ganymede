import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import NavItem from "src/app/common/models/nav/navItem";

@Component({
	selector: "gm-nav-item",
	templateUrl: "./nav-item.component.html",
	styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent {
	@Input()
	public item: NavItem;

	constructor(private router: Router) {}

	private navigate(url: string): void {
		if (url) this.router.navigateByUrl(url);
	}
}
