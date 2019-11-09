begin tran
drop table if exists ArmorClassArmors

drop table if exists MonsterEquipment
drop table if exists MonsterTag
drop table if exists MonsterLanguages
drop table if exists Armors
drop table if exists WeaponWeaponProperties
drop table if exists WeaponProperties
drop table if exists Weapons

drop table if exists Monsters
drop table if exists SpecialTrait

drop table if exists InnateSpells
drop table if exists SpellcasterSpells
drop table if exists MonsterSkillSets
drop table if exists SpecialTraitSet
drop table if exists InnateSpellcastingSpellsPerDays
drop table if exists MonsterSpellcastings

drop table if exists BasicStatsSet

drop table if exists Spells
drop table if exists Equipment
drop table if exists PlayerClass
drop table if exists DiceRolls
drop table if exists Skills
drop table if exists Tag
drop table if exists Languages

drop table if exists CastingTimes
drop table if exists SpellComponents
drop table if exists SpellDurations
drop table if exists SpellRanges
drop table if exists SpellSchools

drop table if exists MonsterTypes
drop table if exists Action
drop table if exists ActionsSet
drop table if exists Alignments
drop table if exists AbilityScores

drop table if exists ArmorClasses
drop table if exists OptionalStats
drop table if exists DamageEffectivenessesSets
drop table if exists MonsterLanguagesSets
drop table if exists MonsterMovements
drop table if exists MonsterSavingThrowSets

drop table if exists Senses

drop table if exists LegendaryActionsSets
drop table if exists LegendaryActionsSet

drop table if exists Campaigns
drop table if exists Rulesets
drop table if exists Publishers

drop table if exists AspNetUserRoles
drop table if exists AspNetRoleClaims
drop table if exists AspNetRoles
drop table if exists AspNetUserClaims
drop table if exists AspNetUserLogins
drop table if exists AspNetUserTokens
drop table if exists AspNetUsers

--rollback tran
commit tran
