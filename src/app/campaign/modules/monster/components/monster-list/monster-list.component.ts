import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListBaseComponent } from "src/app/common/baseComponents/listBaseComponent";
import { Monster } from "../../models/monster";
import { MonsterActions } from "../../store/actions";
import { MonsterService } from "../../monster.service";
import { WordService } from "src/app/services/word.service";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/models/core/iAppState";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeyboardService } from "src/app/services/keyboard/keyboard.service";
import { Location } from "@angular/common";

@Component({
	selector: "gm-monster-list",
	templateUrl: "./monster-list.component.html",
	styleUrls: ["./monster-list.component.scss"]
})
export class MonsterListComponent
	extends ListBaseComponent<Monster, MonsterActions, MonsterService>
	implements OnInit, OnDestroy {
	constructor(
		public words: WordService,
		protected store: NgRedux<IAppState>,
		location: Location,
		router: Router,
		dialog: MatDialog,
		snackBar: MatSnackBar,
		actions: MonsterActions,
		spellService: MonsterService,
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
