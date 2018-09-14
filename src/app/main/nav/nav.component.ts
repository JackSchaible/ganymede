import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  showMenu: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }
}
