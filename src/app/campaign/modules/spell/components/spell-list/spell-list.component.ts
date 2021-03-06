import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { select, NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { WordService } from "src/app/services/word.service";
import { IAppState } from "src/app/models/core/iAppState";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { SpellActions } from "../../store/actions";
import { ListBaseComponent } from "src/app/common/baseComponents/listBaseComponent";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";
import { Location } from "@angular/common";
import { SpellService } from "../../spell.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "gm-spell-list",
	templateUrl: "./spell-list.component.html",
	styleUrls: ["./spell-list.component.scss"]
})
export class SpellListComponent
	extends ListBaseComponent<Spell, SpellActions, SpellService>
	implements OnInit, AfterViewInit, OnDestroy {
	@select(["app", "campaign", "spells"])
	public allSpells$: Observable<Spell[]>;
	public spells$: Observable<Spell[]>;

	public processing: boolean;

	constructor(
		public words: WordService,
		protected store: NgRedux<IAppState>,
		location: Location,
		router: Router,
		dialog: MatDialog,
		snackBar: MatSnackBar,
		actions: SpellActions,
		spellService: SpellService,
		keyboardService: KeyboardService
	) {
		super(
			store,
			router,
			actions,
			spellService,
			location,
			snackBar,
			dialog,
			keyboardService
		);
	}

	public ngOnInit() {
		super.ngOnInit();

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

	public ngAfterViewInit() {
		super.ngAfterViewInit();
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}

	protected constructEditUrl(id: number): string {
		const campaignId = this.store.getState().app.campaign.id;
		return `campaigns/${campaignId}/spells/edit/${id}`;
	}

	protected getItem(): Spell {
		return this.store.getState().app.campaign.spells[this.selectedItem];
	}
}
