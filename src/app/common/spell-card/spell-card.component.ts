import {
	Component,
	Input,
	OnInit,
	OnChanges,
	ViewEncapsulation
} from "@angular/core";
import spell from "../models/monster/traits/spells/spell";
import { WordService } from "src/app/services/word.service";
import { playerClass } from "../models/values";

@Component({
	selector: "gm-spell-card",
	templateUrl: "./spell-card.component.html",
	styleUrls: ["./spell-card.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class SpellCardComponent implements OnInit, OnChanges {
	@Input()
	public spell: spell;

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

		this.spellLevel = this.spell.level + this.words.getSuffix(this.spell.level);

		if (this.spell.classes && this.spell.classes.length > 0)
			switch (this.spell.classes[0]) {
				case playerClass.bard:
					this.cardColor = "purple";
					break;

				case playerClass.cleric:
					this.cardColor = "yellow";
					break;

				case playerClass.druid:
					this.cardColor = "green";
					break;

				case playerClass.paladin:
					this.cardColor = "azure";
					break;

				case playerClass.ranger:
					this.cardColor = "brown";
					break;

				case playerClass.sorcerer:
				case playerClass.warlock:
				case playerClass.wizard:
					this.cardColor = "red";
					break;
			}
		else this.cardColor = "red";
	}

	private getClassName(pc: playerClass): string {
		return playerClass[pc];
	}
}
