import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListBaseComponent } from "src/app/common/baseComponents/listBaseComponent";
import { Monster } from "../../models/monster";
import { MonsterActions } from "../../store/actions";
import { MonsterService } from "../../services/monster.service";
import { WordService } from "src/app/services/word.service";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CRService } from "src/app/main/services/cr.service";
import { MonsterStatsService } from "../../services/monster-stats.service";

@Component({
	selector: "gm-monster-list",
	templateUrl: "./monster-list.component.html",
	styleUrls: ["./monster-list.component.scss"]
})
export class MonsterListComponent
	extends ListBaseComponent<Monster, MonsterActions, MonsterService>
	implements OnInit, OnDestroy {
	@select(["app", "campaign", "monsters"])
	public allMonsters$: Observable<Monster[]>;
	public monsters$: Observable<Monster[]>;

	constructor(
		public words: WordService,
		protected store: NgRedux<IAppState>,
		location: Location,
		router: Router,
		dialog: MatDialog,
		snackBar: MatSnackBar,
		actions: MonsterActions,
		spellService: MonsterService,
		keyboardService: KeyboardService,
		private crService: CRService,
		private monsterStatsService: MonsterStatsService
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

		this.monsters$ = this.allMonsters$.pipe(
			tap((monster: Monster[]) => {
				return monster.sort((a: Monster, b: Monster) => {
					let result: number;

					// TODO: How to get attack bonus and dps?
					// const aCr = this.crService.calculateCr(this.monsterStatsService.calculateAverageHp(a.basicStats.hpDice),
					// this.monsterStatsService.calculateArmorClass(a), )
					// if (a. === b.level) {
					// 	if (a.name < b.name) result = -1;
					// 	else if (a.name > b.name) result = 1;
					// 	else result = 0;
					// } else result = a.level - b.level;

					return result;
				});
			})
		);
	}

	public ngOnDestroy() {
		super.ngOnDestroy();
	}

	protected constructEditUrl(itemId: number): string {
		throw new Error("Method not implemented.");
	}

	protected getItem(): Monster {
		throw new Error("Method not implemented.");
	}
}
