import { Component, OnInit, Input } from "@angular/core";
import Spell from "../models/monster/traits/spells/spell";
import { WordService } from "src/app/services/word.service";
import { PlayerClass } from "../models/values";

@Component({
	selector: "gm-spell-card",
	templateUrl: "./spell-card.component.html",
	styleUrls: ["./spell-card.component.scss"]
})
export class SpellCardComponent implements OnInit {
	@Input()
	public spell: Spell;

	private cardColor: string;
	private spellLevel: string;

	constructor(private words: WordService) {}

	ngOnInit() {
		this.spellLevel = this.spell.Level + this.words.getSuffix(this.spell.Level);

		if (this.spell && this.spell.Classes)
			switch (this.spell.Classes[0]) {
				case PlayerClass.Bard:
					this.cardColor = "purple";
					break;

				case PlayerClass.Cleric:
					this.cardColor = "yellow";
					break;

				case PlayerClass.Druid:
					this.cardColor = "green";
					break;

				case PlayerClass.Paladin:
					this.cardColor = "azure";
					break;

				case PlayerClass.Ranger:
					this.cardColor = "brown";
					break;

				case PlayerClass.Sorcerer:
				case PlayerClass.Warlock:
				case PlayerClass.Wizard:
					this.cardColor = "red";
					break;
			}
		else this.cardColor = "red";
	}
}
