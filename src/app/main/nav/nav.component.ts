import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "gm-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
	showMenu: boolean;
	user: string;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		const u = this.authService.getUser();
		if (u) this.user = u.user;
	}

	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

	closeMenu() {
		this.showMenu = false;
	}
}
