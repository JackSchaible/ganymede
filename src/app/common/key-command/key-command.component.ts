import { Component, Input } from "@angular/core";
import KeyCommandModel from "../models/keyCommandModel";

@Component({
	selector: "gm-key-command",
	templateUrl: "./key-command.component.html",
	styleUrls: ["./key-command.component.scss"]
})
export class KeyCommandComponent {
	@Input()
	public model: KeyCommandModel;
}
