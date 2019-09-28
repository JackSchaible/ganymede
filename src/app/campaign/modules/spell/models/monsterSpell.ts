import { Monster } from "src/app/campaign/modules/monster/models/monster";
import { Spell } from "./spell";

export class MonsterSpell {
	public monsterID: number;
	public monster: Monster;

	public spellID: number;
	public spell: Spell;
}
