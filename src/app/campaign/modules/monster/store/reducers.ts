import { IAppState } from "src/app/models/core/iAppState";
import { AnyAction } from "redux";
import { MonsterAction, MonsterActionTypes } from "./actions";
import * as _ from "lodash";
import { Campaign } from "src/app/campaign/models/campaign";
import { Monster } from "../models/monster";

export function MonsterReducer(state: IAppState, action: AnyAction): IAppState {
	let result = _.cloneDeep(state);
	const monsterAction = action.type as MonsterAction;

	if (monsterAction) {
		switch (monsterAction.argument) {
			case MonsterActionTypes.MONSTER_EDIT:
				result = MonsterEditReducer(state, action.state);
				break;

			case MonsterActionTypes.MONSTER_EDIT_FORM_CHANGED:
				result = MonsterEditedReducer(state, action.state);
				break;

			case MonsterActionTypes.NEW_MONSTER_SAVED:
				result = MonsterSaved(state, action.state, true);
				break;

			case MonsterActionTypes.MONSTER_SAVED:
				result = MonsterSaved(state, action.state, false);
				break;

			case MonsterActionTypes.MONSTER_DELETED:
				result = MonsterDeleted(state, action.state);
				break;
		}
	}

	return result;
}

function MonsterEditReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);
	const MonsterId = newState.app.forms.monsterForm.id;

	let monster: Monster;
	if (MonsterId >= 0)
		monster = oldState.app.campaign.monsters.find(c => c.id === MonsterId);
	else monster = Monster.getDefault();

	state.app.forms.monsterForm = monster;

	return state;
}

// TODO: Need?
function MonsterEditedReducer(
	oldState: IAppState,
	newState: IAppState
): IAppState {
	const state = _.cloneDeep(oldState);

	state.app.forms.monsterForm = newState.app.forms.monsterForm;
	return state;
}

function MonsterSaved(
	oldState: IAppState,
	newState: IAppState,
	isNew: boolean
): IAppState {
	const state = _.cloneDeep(oldState);
	const newMonster = newState.app.forms.monsterForm;
	const campaignIndex = state.app.forms.campaignForm.id;

	state.app.forms.monsterForm = newState.app.forms.monsterForm;

	if (isNew) state.user.campaigns[campaignIndex].monsters.push(newMonster);
	else {
		const index = state.user.campaigns[campaignIndex].monsters.findIndex(
			(monster: Monster) => {
				return monster.id === newMonster.id;
			}
		);

		state.user.campaigns[campaignIndex].monsters[index] = newMonster;
	}

	return state;
}

function MonsterDeleted(oldState: IAppState, newState: IAppState): IAppState {
	const state = _.cloneDeep(oldState);

	const id = newState.app.forms.monsterForm.id;
	const campaign = state.app.campaign;
	const index = campaign.monsters.findIndex((monster: Monster) => {
		return monster.id === id;
	});

	campaign.monsters.splice(index, 1);

	state.user.campaigns[
		state.user.campaigns.findIndex((c: Campaign) => c.id === campaign.id)
	] = _.cloneDeep(campaign);

	return state;
}
