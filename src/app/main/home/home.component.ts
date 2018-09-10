import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.login("jack.schaible@hotmail.com", "Testing!23").subscribe();
  }
}
