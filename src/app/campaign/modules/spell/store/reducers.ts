import { IAppState } from "src/app/models/core/iAppState";
import { AnyAction } from "redux";
import { SpellAction, SpellActionTypes } from "./actions";
import { Spell } from "src/app/campaign/modules/spell/models/spell";
import * as _ from "lodash";
import { Campaign } from "src/app/campaign/models/campaign";
import { SpellSchool } from "../models/spellSchool";
import { Monster } from "../../monster/models/monster";

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

	if (
		state.app.forms.spellForm.spellSchool &&
		(state.app.forms.spellForm.spellSchool.id ||
			state.app.forms.spellForm.spellSchool.id === 0)
	)
		state.app.forms.spellForm.spellSchool = state.app.forms.spellFormData.schools.find(
			(value: SpellSchool) =>
				value.id === state.app.forms.spellForm.spellSchool.id
		);

	return state;
}

function spellSaved(
	oldState: IAppState,
	newState: IAppState,
	isNew: boolean
): IAppState {
	const state = _.cloneDeep(oldState);
	const newSpell = newState.app.forms.spellForm;
	const campaignIndex = state.app.forms.campaignForm.id;

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

	const id = newState.app.forms.spellForm.id;
	const campaign = state.app.campaign;
	const index = campaign.spells.findIndex((spell: Spell) => {
		return spell.id === id;
	});

	campaign.spells.splice(index, 1);

	// TODO: Remove spell from every monster that may have it
	campaign.monsters.forEach((monster: Monster) => {});

	state.user.campaigns[
		state.user.campaigns.findIndex((c: Campaign) => c.id === campaign.id)
	] = _.cloneDeep(campaign);

	return state;
}
