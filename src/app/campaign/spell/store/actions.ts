import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { Spell } from "src/app/models/core/spells/spell";
import { App } from "src/app/models/core/app/app";
import { IAppState } from "src/app/models/core/iAppState";

export class SpellActionTypes {
	public static SPELL_EDIT: string = "SPELL_EDIT";
	public static SPELL_EDIT_FORM_CHANGE: string = "SPELL_EDIT_FORM_CHANGE";
}

export class SpellAction {
	constructor(public argument: string) {}
}

@Injectable({
	providedIn: "root"
})
export class SpellActions {
	public editSpell(spellId: number): AnyAction {
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

	public spellEditFormChange(spell: Spell): AnyAction {
		const app = App.getDefault();
		app.forms.spellForm = spell;

		const state: IAppState = {
			app: app,
			user: undefined
		};

		return {
			type: new SpellAction(SpellActionTypes.SPELL_EDIT_FORM_CHANGE),
			state: state
		};
	}
}
