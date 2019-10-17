import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import { App } from "src/app/models/core/app/app";
import { IAppState } from "src/app/models/core/iAppState";
import { AppUser } from "src/app/models/core/appUser";
import IFormActions from "src/app/store/iFormActions";

export class SpellActionTypes {
	public static SPELL_EDIT: string = "SPELL_EDIT";
	public static NEW_SPELL_SAVED: string = "NEW_SPELL_SAVED";
	public static SPELL_FORM_EDITED: string = "SPELL_FORM_EDITED";
	public static SPELL_SAVED: string = "SPELL_SAVED";
	public static SPELL_DELETED: string = "SPELL_DELETED";
}

export class SpellAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class SpellActions implements IFormActions<Spell> {
	public edit(spellId: number): AnyAction {
		const spellForm: Spell = Spell.getDefault();
		spellForm.id = spellId;

		const app = App.getDefault();
		app.forms.spellForm = spellForm;

		const state: IAppState = {
			user: undefined,
			app: app
		};
		return {
			type: new SpellAction(SpellActionTypes.SPELL_EDIT),
			state: state
		};
	}

	public change(spell: Spell): AnyAction {
		const user = AppUser.getDefault();
		const app = App.getDefault();
		app.forms.spellForm = spell;

		const state: IAppState = {
			user: user,
			app: app
		};
		return {
			type: new SpellAction(SpellActionTypes.SPELL_FORM_EDITED),
			state: state
		};
	}

	public save(spell: Spell, isNew: boolean): AnyAction {
		const user = AppUser.getDefault();
		const app = App.getDefault();
		app.forms.spellForm = spell;

		const state: IAppState = {
			user: user,
			app: app
		};

		let actionType: string = SpellActionTypes.SPELL_SAVED;

		if (isNew) actionType = SpellActionTypes.NEW_SPELL_SAVED;

		return {
			type: new SpellAction(actionType),
			state: state
		};
	}

	public delete(spellId: number): AnyAction {
		const app = App.getDefault();
		const spell = Spell.getDefault();
		spell.id = spellId;
		app.forms.spellForm = spell;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new SpellAction(SpellActionTypes.SPELL_DELETED),
			state: state
		};
	}
}
