import { Component, OnInit } from "@angular/core";
import { select, NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs";
import { Spell } from "src/app/models/core/spells/spell";
import { WordService } from "src/app/services/word.service";
import { IAppState } from "src/app/models/core/iAppState";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { SpellActions } from "../store/actions";

@Component({
	selector: "gm-spell-list",
	templateUrl: "./spell-list.component.html",
	styleUrls: ["./spell-list.component.scss"]
})
export class SpellListComponent implements OnInit {
	@select(["app", "campaign", "spells"])
	public allSpells$: Observable<Spell[]>;
	public spells$: Observable<Spell[]>;

	public processing: boolean;

	constructor(
		public words: WordService,
		private store: NgRedux<IAppState>,
		private router: Router,
		private actions: SpellActions
	) {}

	ngOnInit() {
		this.spells$ = this.allSpells$.pipe(
			tap((spells: Spell[]) => {
				return spells.sort((a: Spell, b: Spell) => {
					let result: number;
					if (a.level === b.level) {
						if (a.name < b.name) result = -1;
						else if (a.name > b.name) result = 1;
						else result = 0;
					} else result = a.level - b.level;

					return result;
				});
			})
		);
	}

	public edit(spellId: number): void {
		this.store.dispatch(this.actions.editSpell(spellId));

		const campaignId = this.store.getState().app.campaign.id;
		this.router.navigateByUrl(`campaigns/${campaignId}/spells/${spellId}`);
	}
}
