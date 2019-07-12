import { Component, Input } from "@angular/core";
import { SpellComponents } from "src/app/models/core/spells/spellComponents";

@Component({
	selector: "gm-spell-components",
	templateUrl: "./spell-components.component.html"
})
export class SpellComponentsComponent {
	@Input()
	public components: SpellComponents;
}
