import { Component } from "@angular/core";
import { StateLoaderService } from "./services/stateLoader.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["../styles/Common.scss"]
})
export class AppComponent {
	title = "ganymede";

	constructor(private stateLoader: StateLoaderService) {}
}
