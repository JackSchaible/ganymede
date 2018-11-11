import skill, { skillGroup } from "./monster/features/skill";

export class size {
	constructor(
		public name: string,
		public space: number,
		public examples: string[],
		public hitDice: number
	) {}
}

export class monsterType {
	constructor(public name: string, public description: string) {}
}

export default class values {
	public static sizes: size[] = [
		new size("Tiny", 2.5, ["Imp", "Sprite"], 4),
		new size("Small", 5, ["Giant Rat", "Goblin"], 6),
		new size("Medium", 5, ["Orc", "Werewolf"], 8),
		new size("Large", 10, ["Hippogriff", "Ogre"], 10),
		new size("Huge", 15, ["Fire Giant", "Treant"], 12),
		new size("Gargantuan", 20, ["Kraken", "Purple Worm"], 20)
	];

	public static types: monsterType[] = [
		new monsterType("Any Race", ""),
		new monsterType(
			"Aberration",
			"are utterly alien beings. Many of them have innate magical Abilities drawn from the creature’s alien mind rather than the mystical forces of the world. The quintessential Aberrations are aboleths, Beholders, Mind Flayers, and slaadi."
		),
		new monsterType(
			"Beast",
			"are nonhumanoid creatures that are a natural part of the fantasy ecology. Some of them have magical powers, but most are unintelligent and lack any society or language. Beasts include all varieties of ordinary animals, dinosaurs, and giant versions of animals."
		),
		new monsterType(
			"Celestial",
			"are creatures native to the Upper Planes. Many of them are the Servants of deities, employed as messengers or agents in the mortal realm and throughout the planes. Celestials are good by Nature, so the exceptional Celestial who strays from a good alignment is a horrifying rarity. Celestials include angels, couatls, and pegasi."
		),
		new monsterType(
			"Construct",
			"are made, not born. Some are programmed by their creators to follow a simple set of instructions, while others are imbued with sentience and capable of independent thought. Golems are the iconic constructs. Many creatures native to the outer plane of Mechanus, such as modrons, are constructs shaped from the raw material of the plane by the will of more powerful creatures."
		),
		new monsterType(
			"Dragon",
			"are large reptilian creatures of ancient Origin and tremendous power. True Dragons, including the good metallic Dragons and the evil chromatic Dragons, are highly intelligent and have innate magic. Also in this category are creatures distantly related to true Dragons, but less powerful, less intelligent, and less magical, such as wyverns and pseudodragons."
		),
		new monsterType(
			"Elemental",
			"are creatures native to the elemental planes. Some creatures of this type are little more than animate masses of their respective elements, including the creatures simply called Elementals. Others have biological forms infused with elemental energy. The races of genies, including djinn and efreet, form the most important civilizations on the elemental planes. Other elemental creatures include azers, and Invisible stalkers."
		),
		new monsterType(
			"Fey",
			"are magical creatures closely tied to the forces of Nature. They dwell in twilight groves and misty forests. In some worlds, they are closely tied to the Feywild, also called the Plane of Faerie. Some are also found in the Outer Planes, particularly the planes of Arborea and the Beastlands. Fey include dryads, pixies, and satyrs."
		),
		new monsterType(
			"Fiend",
			"are creatures of wickedness that are native to the Lower Planes. A few are the Servants of deities, but many more labor under the leadership of archdevils and demon princes. Evil Priests and mages sometimes summon Fiends to the material world to do their bidding. If an evil Celestial is a rarity, a good fiend is almost inconceivable. Fiends include Demons, devils, hell hounds, rakshasas, and yugoloths."
		),
		new monsterType(
			"Giant",
			"tower over humans and their kind. They are humanlike in shape, though some have multiple heads (ettins) or deformities (fomorians). The six varieties of true giant are Hill Giants, Stone Giants, Frost Giants, Fire Giants, Cloud Giants, and Storm Giants. Besides these, creatures such as ogres and Trolls are Giants."
		),
		new monsterType(
			"Humanoid",
			"are the main peoples of a fantasy gaming world, both civilized and savage, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical Abilities (though most humanoids can learn spellcasting), and a bipedal form. The most Common humanoid races are the ones most suitable as player characters: humans, Dwarves, elves, and Halflings. Almost as numerous but far more savage and brutal, and almost uniformly evil, are the races of Goblinoids (goblins, Hobgoblins, and bugbears), orcs, Gnolls, Lizardfolk, and Kobolds."
		),
		new monsterType(
			"Monstrosity",
			"are Monsters in the strictest sense—frightening creatures that are not ordinary, not truly natural, and almost never benign. Some are the results of magical experimentation gone awry (such as owlbears), and others are the product of terrible curses (including minotaurs and yuan-ti). They defy categorization, and in some sense serve as a catch-all category for creatures that don’t fit into any other type."
		),
		new monsterType(
			"Ooze",
			"are gelatinous creatures that rarely have a fixed shape. They are mostly subterranean, dwelling in caves and dungeons and feeding on refuse, carrion, or creatures unlucky enough to get in their way. Black puddings and gelatinous cubes are among the most recognizable oozes."
		),
		new monsterType(
			"Plant",
			"in this context are vegetable creatures, not ordinary flora. Most of them are ambulatory, and some are carnivorous. The quintessential Plants are the Shambling Mound and the Treant. Fungal creatures such as the Gas Spore and the myconid also fall into this category."
		),
		new monsterType(
			"Undead",
			"are once-living creatures brought to a horrifying state of undeath through the practice of necromantic magic or some unholy curse. Undead include walking corpses, such as vampires and zombies, as well as bodiless spirits, such as ghosts and specters."
		)
	];

	public static movementTypes: string[] = ["Burrow", "Climb", "Fly", "Swim"];

	public static senseTypes: string[] = [
		"Blindsight",
		"Darkvision",
		"Tremorsense",
		"Truesight"
	];

	public static skills: skillGroup[] = [
		new skillGroup("Strength", [new skill("Athletics", "Strength")]),
		new skillGroup("Dexterity", [
			new skill("Acrobatics", "Dexterity"),
			new skill("Sleight of Hand", "Dexterity"),
			new skill("Stealth", "Dexterity")
		]),
		new skillGroup("Intelligence", [
			new skill("Arcana", "Intelligence"),
			new skill("History", "Intelligence"),
			new skill("Investigation", "Intelligence"),
			new skill("Nature", "Intelligence"),
			new skill("Religion", "Intelligence")
		]),
		new skillGroup("Wisdom", [
			new skill("Animal Handling", "Wisdom"),
			new skill("Insight", "Wisdom"),
			new skill("Medicine", "Wisdom"),
			new skill("Perception", "Wisdom"),
			new skill("Survival", "Wisdom")
		]),
		new skillGroup("Charisma", [
			new skill("Deception", "Charisma"),
			new skill("Intimidate", "Charisma"),
			new skill("Performance", "Charisma"),
			new skill("Persuasion", "Charisma")
		])
	];

	public static damageTypes: string[] = [
		"Acid",
		"Bludgeoning",
		"Cold",
		"Fire",
		"Force",
		"Lightning",
		"Necrotic",
		"Piercing",
		"Poison",
		"Psychic",
		"Radiant",
		"Slashing",
		"Thunder"
	];

	public static conditions: string[] = [
		"Blinded",
		"Charmed",
		"Deafened",
		"Fatigued",
		"Frightened",
		"Grappled",
		"Incapacitated",
		"Invisible",
		"Paralyzed",
		"Petrified",
		"Poisoned",
		"Restrained",
		"Stunned",
		"Unconscious"
	];

	public static languages: string[] = [
		"Abyssal",
		"Aquan",
		"Auran",
		"Celestial",
		"Common",
		"Deep Speech",
		"Draconic",
		"Druidic",
		"Dwarvish",
		"Elvish",
		"Giant",
		"Gnomish",
		"Goblin",
		"Gnoll",
		"Halfling",
		"Ignan",
		"Infernal",
		"Orc",
		"Primordial",
		"Sylvan",
		"Terran",
		"Undercommon"
	];

	public static spellClasses: string[] = [
		"Bard",
		"Cleric",
		"Druid",
		"Paladin",
		"Ranger",
		"Sorcerer",
		"Warlock",
		"Wizard"
	];
}

export enum playerClass {
	barbarian,
	bard,
	cleric,
	druid,
	fighter,
	monk,
	paladin,
	ranger,
	rogue,
	sorcerer,
	warlock,
	wizard
}
