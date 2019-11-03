import { Component, Input } from "@angular/core";
import { CastingTime } from "src/app/campaign/modules/spell/models/castingTime";

@Component({
	selector: "gm-casting-time",
	templateUrl: "./casting-time.component.html"
})
export class CastingTimeComponent {
	@Input()
	public castingTime: CastingTime;
}
