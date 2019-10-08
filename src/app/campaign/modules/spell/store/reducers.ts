import { IAppState } from "src/app/models/core/iAppState";
import { AnyAction } from "redux";
import { SpellAction, SpellActionTypes } from "./actions";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import * as _ from "lodash";
import { Campaign } from "src/app/campaign/models/campaign";

export function spellReducer(state: IAppState, action: AnyAction): IAppState {
	let result = _.cloneDeep(state);
	const spellAction = action.type as SpellAction;

	if (spellAction) {
		switch (spellAction.argument) {
			case SpellActionTypes.SPELL_EDIT:
				result = spellEditReducer(state, action.state);
				break;

			case SpellActionTypes.SPELL_FORM_EDITED:
				result = spellEditedReducer(state, action.state);
				break;

			case SpellActionTypes.NEW_SPELL_SAVED:
				result = spellSaved(state, action.state, true);
				break;

			case SpellActionTypes.SPELL_SAVED:
				result = spellSaved(state, action.state, false);
				break;

			case SpellActionTypes.SPELL_DELETED:
				result = spellDeleted(state, action.state);
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

function spellEditedReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);

	state.app.forms.spellForm = newState.app.forms.spellForm;

	return state;
}

function spellSaved(
	oldState: IAppState,
	newState: IAppState,
	isNew: boolean
): IAppState {
	const state = _.cloneDeep(oldState);
	const newSpell = newState.app.forms.spellForm;
	const campaignIndex = state.user.campaigns.findIndex(
		(campaign: Campaign) => {
			return campaign.id === state.app.forms.spellForm.campaignID;
		}
	);

	state.app.forms.spellForm = newState.app.forms.spellForm;

	if (isNew) state.user.campaigns[campaignIndex].spells.push(newSpell);
	else {
		const index = state.user.campaigns[campaignIndex].spells.findIndex(
			(spell: Spell) => {
				return spell.id === newSpell.id;
			}
		);

		state.user.campaigns[campaignIndex].spells[index] = newSpell;
	}

	return state;
}

function spellDeleted(oldState: IAppState, newState: IAppState): IAppState {
	const state = _.cloneDeep(oldState);

	const campaignIndex = state.user.campaigns.findIndex(
		(campaign: Campaign) =>
			campaign.id === newState.app.forms.spellForm.campaignID
	);
	const id = newState.app.forms.spellForm.id;
	const index = state.user.campaigns[campaignIndex].spells.findIndex(
		(spell: Spell) => {
			return spell.id === id;
		}
	);

	state.user.campaigns[campaignIndex].spells.splice(index, 1);

	return state;
}
