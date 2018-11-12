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
import { SpellSchool } from "../models/monster/classes/SpellData";

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

	constructor(private words: WordService) { }

	ngOnInit() {
		this.onChange();
	}
	ngOnChanges() {
		this.onChange();
	}

	public onChange() {
		if (!this.spell) return;

		this.spellLevel = this.spell.level + this.words.getSuffix(this.spell.level);

		if (this.spell.classes && this.spell.classes.length > 0)
			switch (this.spell.classes[0]) {
				case PlayerClass.bard:
					this.cardColor = "purple";
					break;

				case PlayerClass.cleric:
					this.cardColor = "yellow";
					break;

				case PlayerClass.druid:
					this.cardColor = "green";
					break;

				case PlayerClass.paladin:
					this.cardColor = "azure";
					break;

				case PlayerClass.ranger:
					this.cardColor = "brown";
					break;

				case PlayerClass.sorcerer:
				case PlayerClass.warlock:
				case PlayerClass.wizard:
					this.cardColor = "red";
					break;
			}
		else this.cardColor = "red";
	}

	private getClassName(pc: PlayerClass): string {
		return PlayerClass[pc];
	}

	private getSchoolName(school: SpellSchool): string {
		return SpellSchool[school];
	}
}
