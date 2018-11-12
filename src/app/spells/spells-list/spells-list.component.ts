import { Component, OnInit, ViewChild } from "@angular/core";
import Spell from "src/app/common/models/monster/traits/spells/spell";
import { SpellService } from "src/app/services/spell.service";
import { MatSort, MatTableDataSource, MatTable } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PlayerClass } from "src/app/common/models/values";
import { Router } from "@angular/router";

@Component({
	selector: "gm-spells-list",
	templateUrl: "./spells-list.component.html"
})
export class SpellsListComponent implements OnInit {
	private colsToDisplay: string[] = [
		"name",
		"level",
		"castingTime",
		"range",
		"components",
		"duration"
	];
	private allSpells: Spell[];
	private filteredSpells: Spell[];
	private spells: MatTableDataSource<Spell> = new MatTableDataSource([]);

	@ViewChild(MatSort)
	private sort: MatSort;

	@ViewChild(MatTable)
	private table: MatTable<Spell>;

	private selectedSpell: Spell;

	private nameFilter: string;
	private classFilter: string;

	private classes: string[];
	private formGroup: FormGroup;
	private form = {
		name: []
	};

	constructor(
		private spellService: SpellService,
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.classes = [];

		let classKeys = Object.keys(PlayerClass);
		classKeys = classKeys.splice(classKeys.length / 2, classKeys.length);

		this.classes.push("None");
		for (let i = 0; i < classKeys.length; i++) {
			var text = classKeys[i];
			this.classes.push(text);
		}
	}

	ngOnInit() {
		this.spellService.getSpellsByUser().subscribe(r => {
			this.allSpells = r;
			this.spells = new MatTableDataSource(r);
			this.spells.sort = this.sort;
			this.table.renderRows();
		});

		this.formGroup = this.formBuilder.group(this.form);
	}

	private selected(spell: Spell): void {
		this.selectedSpell = spell;
	}

	private closeCard(): void {
		this.selectedSpell = null;
	}

	private filter(): void {
		if (
			!this.nameFilter &&
			(!this.classFilter || this.classFilter === "None")
		) {
			this.filteredSpells = [];
			this.spells.data = this.allSpells;
			return;
		}

		let filteredSpells = [];

		for (let i = 0; i < this.allSpells.length; i++) {
			const spell = this.allSpells[i];

			let name: boolean = false,
				cls: boolean = false,
				shouldName: boolean = this.nameFilter && this.nameFilter.length > 0,
				shouldClass: boolean = this.classFilter && this.classFilter !== "None";

			if (shouldName)
				name =
					spell.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) >= 0;

			if (shouldClass)
				cls = spell.classes.indexOf(PlayerClass[this.classFilter]) >= 0;

			if ((!shouldName || name) && (!shouldClass || cls))
				filteredSpells.push(spell);
		}

		this.spells.data = filteredSpells;
		this.selectedSpell = null;
	}

	private editSpell(): void {
		debugger;
		this.router.navigateByUrl("/spells/edit/" + this.selectedSpell.spellID);
	}
}
