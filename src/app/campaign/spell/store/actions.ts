import { Injectable } from "@angular/core";
import { AnyAction } from "redux";
import { Spell } from "src/app/models/core/spells/spell";
import { App } from "src/app/models/core/app/app";
import { IAppState } from "src/app/models/core/iAppState";
import { SpellSchool } from "src/app/models/core/spells/spellSchool";
import { SpellRange } from "src/app/models/core/spells/spellRange";

export class SpellActionTypes {
	public static SPELL_EDIT: string = "SPELL_EDIT";
	public static SPELL_EDIT_FORM_CHANGE: string = "SPELL_EDIT_FORM_CHANGE";
	public static SPELL_EDIT_SCHOOL_CHANGE: string = "SPELL_EDIT_SCHOOL_CHANGE";
	public static SPELL_EDIT_RANGE_TYPE_CHANGE: string =
		"SPELL_EDIT_RANGE_TYPE_CHANGE";
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

	public spellSchoolChanged(school: SpellSchool): AnyAction {
		const spellForm: Spell = Spell.getDefault();
		spellForm.spellSchool = school;

		const app = App.getDefault();
		app.forms.spellForm = spellForm;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new SpellAction(SpellActionTypes.SPELL_EDIT_SCHOOL_CHANGE),
			state: state
		};
	}

	public spellRangeTypeChanged(rangeType: string): AnyAction {
		const spellForm: Spell = Spell.getDefault();
		spellForm.spellRange = SpellRange.getDefault();

		switch (rangeType) {
			case "self":
				spellForm.spellRange.self = true;
				break;

			case "touch":
				spellForm.spellRange.touch = true;
				break;
		}

		const app = App.getDefault();
		app.forms.spellForm = spellForm;

		const state: IAppState = {
			user: undefined,
			app: app
		};

		return {
			type: new SpellAction(
				SpellActionTypes.SPELL_EDIT_RANGE_TYPE_CHANGE
			),
			state: state
		};
	}
}
