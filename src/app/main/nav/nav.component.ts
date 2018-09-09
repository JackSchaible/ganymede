import { Component, OnInit } from "@angular/core";

@Component({
  selector: "nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  showMenu: boolean;
  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
