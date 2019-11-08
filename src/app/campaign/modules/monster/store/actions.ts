import { Injectable } from "@angular/core";
import IFormActions from "src/app/store/iFormActions";
import { Monster } from "../models/monster";
import { AnyAction } from "redux";
import { App } from "src/app/models/core/app/app";
import { IAppState } from "src/app/models/core/iAppState";

export class MonsterActionTypes {
	public static MONSTER_SELECTED: string = "MONSTER_SELECTED";
	public static MONSTER_DESELECTED: string = "MONSTER_DESELECTED";
	public static MONSTER_EDIT: string = "MONSTER_EDIT";
	public static MONSTER_EDIT_FORM_CHANGED: string =
		"MONSTER_EDIT_FORM_CHANGED";
	public static NEW_MONSTER_SAVED: string = "NEW_MONSTER_SAVED";
	public static MONSTER_SAVED: string = "MONSTER_SAVED";
	public static MONSTER_DELETED: string = "MONSTER_DELETED";
}

export class MonsterAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class MonsterActions implements IFormActions<Monster> {
	public edit(id: number): AnyAction {
		const monster = Monster.getDefault();
		monster.id = id;

		const app = App.getDefault();
		app.forms.monsterForm = monster;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new MonsterAction(MonsterActionTypes.MONSTER_EDIT),
			state: state
		};
	}

	public change(monster: Monster): AnyAction {
		const app = App.getDefault();
		app.forms.monsterForm = monster;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new MonsterAction(
				MonsterActionTypes.MONSTER_EDIT_FORM_CHANGED
			),
			state: state
		};
	}

	public save(
		monster: Monster,
		campaignId: number,
		isNew: boolean
	): AnyAction {
		const app = App.getDefault();
		app.forms.monsterForm = monster;
		app.forms.campaignForm.id = campaignId;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		let actionType: string = MonsterActionTypes.MONSTER_SAVED;

		if (isNew) actionType = MonsterActionTypes.NEW_MONSTER_SAVED;

		return {
			type: new MonsterAction(actionType),
			state: state
		};
	}

	public delete(monsterId: number): AnyAction {
		const app = App.getDefault();
		const monster = Monster.getDefault();
		monster.id = monsterId;
		app.forms.monsterForm = monster;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new MonsterAction(MonsterActionTypes.MONSTER_DELETED),
			state: state
		};
	}
}
