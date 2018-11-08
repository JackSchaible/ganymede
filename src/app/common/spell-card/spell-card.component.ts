import {
	Component,
	Input,
	OnInit,
	OnChanges,
	ViewEncapsulation
} from "@angular/core";
import Spell from "../models/monster/traits/spells/spell";
import { WordService } from "src/app/services/word.service";
import { PlayerClass } from "../models/values";

@Component({
	selector: "gm-spell-card",
	templateUrl: "./spell-card.component.html",
	styleUrls: ["./spell-card.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class SpellCardComponent implements OnInit, OnChanges {
	@Input()
	public spell: Spell;

	private cardColor: string;
	private spellLevel: string;

	constructor(private words: WordService) {}

	ngOnInit() {
		this.onChange();
	}
	ngOnChanges() {
		this.onChange();
	}

	public onChange() {
		if (!this.spell) return;

		this.spellLevel = this.spell.Level + this.words.getSuffix(this.spell.Level);

		if (this.spell.Classes && this.spell.Classes.length > 0)
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

	private getClassName(pc: PlayerClass): string {
		return PlayerClass[pc];
	}
}
