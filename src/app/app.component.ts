import { Component } from "@angular/core";
import { StateLoaderService } from "./services/stateLoader.service";
import { AppUser } from "./models/core/AppUser";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["../styles/Common.scss"]
})
export class AppComponent {
	title = "ganymede";

	constructor(private stateLoader: StateLoaderService) {
		//TODO next: shove this data into the store
		stateLoader.loadState().subscribe((user: AppUser) => {});
	}
}
