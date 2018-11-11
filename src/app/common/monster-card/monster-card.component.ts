import {
	Component,
	OnChanges,
	Input,
	OnInit,
	ChangeDetectorRef
} from "@angular/core";
import monster from "../models/monster/monster";
import { CalculatorService } from "../../services/calculator.service";
import values from "../models/values";
import { WordService } from "../../services/word.service";
import skill from "../models/monster/features/skill";
import { spellcasting } from "../models/monster/traits/spells/spells";
import spellcastingClass from "../models/monster/classes/SpellcastingClass";

@Component({
	selector: "gm-monster-card",
	templateUrl: "./monster-card.component.html",
	styleUrls: ["./monster-card.component.scss"]
})
export class MonsterCardComponent implements OnChanges, OnInit {
	@Input()
	monster: monster;

	private alignmentString: string;

	private strMod: string;
	private dexMod: string;
	private conMod: string;
	private intMod: string;
	private wisMod: string;
	private chaMod: string;

	private cr: string;
	private xp: number;

	constructor(
		private calc: CalculatorService,
		private change: ChangeDetectorRef,
		private words: WordService
	) {
		if (!this.monster) this.monster = monster.makeDefault();
	}

	ngOnInit() {
		this.calculateValues();
	}

	ngOnChanges() {
		this.calculateValues();
	}

	public calculateValues(): void {
		this.alignmentString = this.calc.getAlignmentString(
			this.monster.basicInfo.alignment
		);

		const str = this.monster ? this.monster.stats.strength : 10;
		const dex = this.monster ? this.monster.stats.dexterity : 10;
		const con = this.monster ? this.monster.stats.constitution : 10;
		const int = this.monster ? this.monster.stats.intelligence : 10;
		const wis = this.monster ? this.monster.stats.wisdom : 10;
		const cha = this.monster ? this.monster.stats.charisma : 10;

		let mod = Math.floor((str - 10) / 2);
		this.strMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((dex - 10) / 2);
		this.dexMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((con - 10) / 2);
		this.conMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((int - 10) / 2);
		this.intMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((wis - 10) / 2);
		this.wisMod = `${mod < 0 ? "" : "+"}${mod}`;

		mod = Math.floor((cha - 10) / 2);
		this.chaMod = `${mod < 0 ? "" : "+"}${mod}`;

		const c = this.monster ? this.monster.features.challenge : 0;
		this.xp = this.calc.crToXP(c);
		this.cr = this.calc.getCrString(c);

		this.calc.calcAC(this.monster.stats);

		this.monster.stats.hpAverage = Math.floor(
			this.monster.stats.hpRoll.count *
				((this.monster.stats.hpRoll.sides + 1) / 2)
		);

		this.calc.calcPP(this.monster.stats);
		this.change.markForCheck();
		this.change.detectChanges();
	}

	private getPP(): number {
		return this.calc.calcPP(this.monster.stats);
	}

	private getST(savingThrow: skill): string {
		let num = this.calc.calcSavingThrow(savingThrow, this.monster);
		return (num >= 0 ? "+" : "-") + num;
	}

	private getSkill(skill: skill): string {
		let num = this.calc.calcSkill(skill, this.monster);

		for (let i = 0; i < values.skills.length; i++) {
			for (let j = 0; j < values.skills[i].skills.length; j++)
				if (
					skill.name === values.skills[i].skills[j].name &&
					skill.modifyingAbility === values.skills[i].ability
				) {
					return `${skill.name} ${num >= 0 ? "+" : "-"}${num}`;
				} else {
					return `${skill.modifyingAbility} (${skill.name}) ${
						num >= 0 ? "+" : "-"
					}${num}`;
				}
		}

		return `${skill.modifyingAbility} (${skill.name}) ${
			num >= 0 ? "+" : "-"
		}${num}`;
	}

	private getSpellsaveDC(): number {
		return (
			8 +
			this.monster.basicInfo.proficiencyModifier +
			this.calc.getModifierByName(
				((this.monster.traits.spells as spellcasting).classInstance
					.baseClass as spellcastingClass).spellcastingAbility,
				this.monster
			)
		);
	}

	private getSpellAttackMod(): string {
		const num =
			this.monster.basicInfo.proficiencyModifier +
			this.calc.getModifierByName(
				((this.monster.traits.spells as spellcasting).classInstance
					.baseClass as spellcastingClass).spellcastingAbility,
				this.monster
			);

		return (num >= 0 ? "+" : "-") + num;
	}

	private getSpellSlots(): any[] {
		const instance = (this.monster.traits.spells as spellcasting).classInstance;
		const base = instance.baseClass as spellcastingClass;

		let slots = [];
		const slotAllotment = base.spellAdvancement[instance.level - 1];

		slots.push({
			Name: "Cantrips",
			Slots: base.cantrips[instance.level]
		});

		for (let i = 0; i < slotAllotment.length; i++) {
			if (slotAllotment[i] === 0) continue;
			slots.push({
				Name: i + 1 + this.words.getSuffix(i) + " Level",
				Slots: slotAllotment[i]
			});
		}

		return slots;
	}
}
