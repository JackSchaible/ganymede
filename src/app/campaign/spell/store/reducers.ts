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

	// TODO: Handle the special case of range types
	state.app.forms.spellForm = newState.app.forms.spellForm;

	return state;
}
