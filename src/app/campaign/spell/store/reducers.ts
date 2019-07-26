import { IAppState } from "src/app/models/core/iAppState";
import { AnyAction } from "redux";
import { SpellAction, SpellActionTypes } from "./actions";
import { Spell } from "src/app/models/core/spells/spell";
import * as _ from "lodash";

export function spellReducer(state: IAppState, action: AnyAction): IAppState {
	let result = _.cloneDeep(state);
	const spellAction = action.type as SpellAction;

	if (spellAction) {
		switch (spellAction.argument) {
			case SpellActionTypes.SPELL_EDIT:
				result = spellEditReducer(state, action.state);
				break;

			case SpellActionTypes.SPELL_EDIT_FORM_CHANGE:
				result = spellEditFormChangeReducer(state, action.state);
				break;

			case SpellActionTypes.SPELL_EDIT_SCHOOL_CHANGE:
				result = spellEditSchoolChangeReducer(state, action.state);
				break;

			case SpellActionTypes.SPELL_EDIT_RANGE_TYPE_CHANGE:
				result = spellEditRangeTypeChangeReducer(state, action.state);
				break;
		}
	}

	return result;
}

function spellEditReducer(oldState: IAppState, newState: IAppState): IAppState {
	const state = _.cloneDeep(oldState);
	const spellId = newState.app.forms.spellForm.id;

	let spell: Spell;
	if (spellId >= 0)
		spell = oldState.app.campaign.spells.find(c => c.id === spellId);
	else spell = Spell.getDefault();

	state.app.forms.spellForm = spell;

	return state;
}

function spellEditFormChangeReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);

	state.app.forms.spellForm = newState.app.forms.spellForm;

	return state;
}

function spellEditSchoolChangeReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);
	state.app.forms.spellForm.spellSchoolID =
		newState.app.forms.spellForm.spellSchool.id;
	state.app.forms.spellForm.spellSchool =
		newState.app.forms.spellForm.spellSchool;

	return state;
}

function spellEditRangeTypeChangeReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);

	if (!newState.app.forms.spellForm.spellRange.touch)
		state.app.forms.spellForm.spellRange.touch = false;
	else if (newState.app.forms.spellForm.spellRange.touch === true)
		state.app.forms.spellForm.spellRange.touch = true;

	if (!newState.app.forms.spellForm.spellRange.self)
		state.app.forms.spellForm.spellRange.self = false;
	else if (newState.app.forms.spellForm.spellRange.self === true)
		state.app.forms.spellForm.spellRange.self = true;

	return state;
}
