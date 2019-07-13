import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { Spell } from "src/app/models/core/spells/spell";
import { App } from "src/app/models/core/app/app";
import { IAppState } from "src/app/models/core/iAppState";

export class SpellActionTypes {
	public static SPELL_EDIT: string = "SPELL_EDIT";
	// public static CAMPAIGN_EDIT_RULESET_CHANGED: string =
	// 	"CAMPAIGN_EDIT_RULESET_CHANGED";
	// public static NEW_CAMPAIGN_SAVED: string = "NEW_CAMPAIGN_SAVED";
	// public static CAMPAIGN_SAVED: string = "CAMPAIGN_SAVED";
	// public static CAMPAIGN_DELETED: string = "CAMPAIGN_DELETED";
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
			user: null,
			app: app
		};
		return {
			type: new SpellAction(SpellActionTypes.SPELL_EDIT),
			state: state
		};
	}
}
