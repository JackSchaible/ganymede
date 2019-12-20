USE [Ganymede]
GO
ALTER TABLE [dbo].[WeaponWeaponProperties] DROP CONSTRAINT [FK_WeaponWeaponProperties_Weapons_WeaponID]
GO
ALTER TABLE [dbo].[WeaponWeaponProperties] DROP CONSTRAINT [FK_WeaponWeaponProperties_WeaponProperties_WeaponPropertyID]
GO
ALTER TABLE [dbo].[Weapons] DROP CONSTRAINT [FK_Weapons_Equipment_ID]
GO
ALTER TABLE [dbo].[Weapons] DROP CONSTRAINT [FK_Weapons_DiceRolls_DiceRollID]
GO
ALTER TABLE [dbo].[Spells] DROP CONSTRAINT [FK_Spells_SpellSchools_SpellSchoolID]
GO
ALTER TABLE [dbo].[Spells] DROP CONSTRAINT [FK_Spells_SpellRanges_SpellRangeID]
GO
ALTER TABLE [dbo].[Spells] DROP CONSTRAINT [FK_Spells_SpellDurations_SpellDurationID]
GO
ALTER TABLE [dbo].[Spells] DROP CONSTRAINT [FK_Spells_SpellComponents_SpellComponentsID]
GO
ALTER TABLE [dbo].[Spells] DROP CONSTRAINT [FK_Spells_Campaigns_CampaignID]
GO
ALTER TABLE [dbo].[SpellCastingTimes] DROP CONSTRAINT [FK_SpellCastingTimes_Spells_SpellID]
GO
ALTER TABLE [dbo].[SpellCastingTimes] DROP CONSTRAINT [FK_SpellCastingTimes_CastingTimes_CastingTimeID]
GO
ALTER TABLE [dbo].[SpellcasterSpells] DROP CONSTRAINT [FK_SpellcasterSpells_Spells_SpellID]
GO
ALTER TABLE [dbo].[SpellcasterSpells] DROP CONSTRAINT [FK_SpellcasterSpells_Spellcasters_SpellcasterID]
GO
ALTER TABLE [dbo].[Spellcasters] DROP CONSTRAINT [FK_Spellcasters_PlayerClasses_SpellcastingClassID]
GO
ALTER TABLE [dbo].[Spellcasters] DROP CONSTRAINT [FK_Spellcasters_MonsterSpellcastings_ID]
GO
ALTER TABLE [dbo].[SpecialTraitsSet] DROP CONSTRAINT [FK_SpecialTraitsSet_MonsterSpellcastings_MonsterSpellcastingID]
GO
ALTER TABLE [dbo].[SpecialTrait] DROP CONSTRAINT [FK_SpecialTrait_SpecialTraitsSet_SpecialTraitsSetID]
GO
ALTER TABLE [dbo].[Rulesets] DROP CONSTRAINT [FK_Rulesets_Publishers_PublisherID]
GO
ALTER TABLE [dbo].[RechargeActions] DROP CONSTRAINT [FK_RechargeActions_Actions_ID]
GO
ALTER TABLE [dbo].[PerDayActions] DROP CONSTRAINT [FK_PerDayActions_Actions_ID]
GO
ALTER TABLE [dbo].[OptionalStats] DROP CONSTRAINT [FK_OptionalStats_Senses_SensesID]
GO
ALTER TABLE [dbo].[OptionalStats] DROP CONSTRAINT [FK_OptionalStats_MonsterSavingThrowSets_MonsterSavingThrowSetID]
GO
ALTER TABLE [dbo].[OptionalStats] DROP CONSTRAINT [FK_OptionalStats_MonsterLanguagesSets_MonsterLanguageSetID]
GO
ALTER TABLE [dbo].[OptionalStats] DROP CONSTRAINT [FK_OptionalStats_DamageEffectivenessesSets_DamageEffectivenessSetID]
GO
ALTER TABLE [dbo].[MonsterTags] DROP CONSTRAINT [FK_MonsterTags_Tags_TagID]
GO
ALTER TABLE [dbo].[MonsterTags] DROP CONSTRAINT [FK_MonsterTags_Monsters_MonsterID]
GO
ALTER TABLE [dbo].[MonsterSkillSets] DROP CONSTRAINT [FK_MonsterSkillSets_Skills_SkillID]
GO
ALTER TABLE [dbo].[MonsterSkillSets] DROP CONSTRAINT [FK_MonsterSkillSets_OptionalStats_OptionalStatsID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_SpecialTraitsSet_SpecialTraitSetID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_OptionalStats_OptionalStatsID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_MonsterTypes_MonsterTypeID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_LegendaryActionsSets_LegendaryActionsID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_Campaigns_CampaignID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_BasicStatsSet_BasicStatsID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_ActionsSets_ActionSetID]
GO
ALTER TABLE [dbo].[Monsters] DROP CONSTRAINT [FK_Monsters_AbilityScores_AbilityScoresID]
GO
ALTER TABLE [dbo].[MonsterLanguages] DROP CONSTRAINT [FK_MonsterLanguages_MonsterLanguagesSets_MonsterLanguageSetID]
GO
ALTER TABLE [dbo].[MonsterLanguages] DROP CONSTRAINT [FK_MonsterLanguages_Languages_LanguageID]
GO
ALTER TABLE [dbo].[MonsterEquipment] DROP CONSTRAINT [FK_MonsterEquipment_Monsters_MonsterID]
GO
ALTER TABLE [dbo].[MonsterEquipment] DROP CONSTRAINT [FK_MonsterEquipment_Equipment_EquipmentID]
GO
ALTER TABLE [dbo].[MonsterAlignments] DROP CONSTRAINT [FK_MonsterAlignments_Monsters_MonsterID]
GO
ALTER TABLE [dbo].[MonsterAlignments] DROP CONSTRAINT [FK_MonsterAlignments_Alignments_AlignmentID]
GO
ALTER TABLE [dbo].[LegendaryActions] DROP CONSTRAINT [FK_LegendaryActions_Actions_ID]
GO
ALTER TABLE [dbo].[InnateSpells] DROP CONSTRAINT [FK_InnateSpells_Spells_SpellID]
GO
ALTER TABLE [dbo].[InnateSpells] DROP CONSTRAINT [FK_InnateSpells_InnateSpellcastingSpellsPerDays_InnateSpellcastingSpellsPerDayID]
GO
ALTER TABLE [dbo].[InnateSpellcastingSpellsPerDays] DROP CONSTRAINT [FK_InnateSpellcastingSpellsPerDays_InnateSpellcastings_SpellcastingID]
GO
ALTER TABLE [dbo].[InnateSpellcastings] DROP CONSTRAINT [FK_InnateSpellcastings_MonsterSpellcastings_ID]
GO
ALTER TABLE [dbo].[HitEffects] DROP CONSTRAINT [FK_HitEffects_DiceRolls_DamageID]
GO
ALTER TABLE [dbo].[HitEffects] DROP CONSTRAINT [FK_HitEffects_Attacks_AttackID]
GO
ALTER TABLE [dbo].[ClassSpells] DROP CONSTRAINT [FK_ClassSpells_Spells_SpellID]
GO
ALTER TABLE [dbo].[ClassSpells] DROP CONSTRAINT [FK_ClassSpells_PlayerClasses_PlayerClassID]
GO
ALTER TABLE [dbo].[Campaigns] DROP CONSTRAINT [FK_Campaigns_Rulesets_RulesetID]
GO
ALTER TABLE [dbo].[Campaigns] DROP CONSTRAINT [FK_Campaigns_AspNetUsers_AppUserId]
GO
ALTER TABLE [dbo].[BasicStatsSet] DROP CONSTRAINT [FK_BasicStatsSet_MonsterMovements_MovementID]
GO
ALTER TABLE [dbo].[BasicStatsSet] DROP CONSTRAINT [FK_BasicStatsSet_DiceRolls_DiceRollID]
GO
ALTER TABLE [dbo].[BasicStatsSet] DROP CONSTRAINT [FK_BasicStatsSet_ArmorClasses_ArmorClassID]
GO
ALTER TABLE [dbo].[Attacks] DROP CONSTRAINT [FK_Attacks_Actions_ID]
GO
ALTER TABLE [dbo].[AspNetUserTokens] DROP CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetRoleClaims] DROP CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[Armors] DROP CONSTRAINT [FK_Armors_Equipment_ID]
GO
ALTER TABLE [dbo].[ArmorClassArmors] DROP CONSTRAINT [FK_ArmorClassArmors_Armors_ArmorID]
GO
ALTER TABLE [dbo].[ArmorClassArmors] DROP CONSTRAINT [FK_ArmorClassArmors_ArmorClasses_ArmorClassID]
GO
ALTER TABLE [dbo].[Actions] DROP CONSTRAINT [FK_Actions_LegendaryActionsSets_LegendaryActionsSetID]
GO
ALTER TABLE [dbo].[Actions] DROP CONSTRAINT [FK_Actions_ActionsSets_ActionsSetID]
GO
/****** Object:  Table [dbo].[WeaponWeaponProperties]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[WeaponWeaponProperties]
GO
/****** Object:  Table [dbo].[Weapons]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[Weapons]
GO
/****** Object:  Table [dbo].[WeaponProperties]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[WeaponProperties]
GO
/****** Object:  Table [dbo].[Tags]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[Tags]
GO
/****** Object:  Table [dbo].[SpellSchools]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[SpellSchools]
GO
/****** Object:  Table [dbo].[Spells]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[Spells]
GO
/****** Object:  Table [dbo].[SpellRanges]    Script Date: 12/20/2019 3:24:05 PM ******/
DROP TABLE [dbo].[SpellRanges]
GO
/****** Object:  Table [dbo].[SpellDurations]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[SpellDurations]
GO
/****** Object:  Table [dbo].[SpellComponents]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[SpellComponents]
GO
/****** Object:  Table [dbo].[SpellCastingTimes]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[SpellCastingTimes]
GO
/****** Object:  Table [dbo].[SpellcasterSpells]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[SpellcasterSpells]
GO
/****** Object:  Table [dbo].[Spellcasters]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Spellcasters]
GO
/****** Object:  Table [dbo].[SpecialTraitsSet]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[SpecialTraitsSet]
GO
/****** Object:  Table [dbo].[SpecialTrait]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[SpecialTrait]
GO
/****** Object:  Table [dbo].[Skills]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Skills]
GO
/****** Object:  Table [dbo].[Senses]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Senses]
GO
/****** Object:  Table [dbo].[Rulesets]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Rulesets]
GO
/****** Object:  Table [dbo].[RechargeActions]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[RechargeActions]
GO
/****** Object:  Table [dbo].[Publishers]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Publishers]
GO
/****** Object:  Table [dbo].[PlayerClasses]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[PlayerClasses]
GO
/****** Object:  Table [dbo].[PerDayActions]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[PerDayActions]
GO
/****** Object:  Table [dbo].[OptionalStats]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[OptionalStats]
GO
/****** Object:  Table [dbo].[MonsterTypes]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterTypes]
GO
/****** Object:  Table [dbo].[MonsterTags]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterTags]
GO
/****** Object:  Table [dbo].[MonsterSpellcastings]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterSpellcastings]
GO
/****** Object:  Table [dbo].[MonsterSkillSets]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterSkillSets]
GO
/****** Object:  Table [dbo].[MonsterSavingThrowSets]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterSavingThrowSets]
GO
/****** Object:  Table [dbo].[Monsters]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Monsters]
GO
/****** Object:  Table [dbo].[MonsterMovements]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterMovements]
GO
/****** Object:  Table [dbo].[MonsterLanguagesSets]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterLanguagesSets]
GO
/****** Object:  Table [dbo].[MonsterLanguages]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterLanguages]
GO
/****** Object:  Table [dbo].[MonsterEquipment]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterEquipment]
GO
/****** Object:  Table [dbo].[MonsterAlignments]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[MonsterAlignments]
GO
/****** Object:  Table [dbo].[LegendaryActionsSets]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[LegendaryActionsSets]
GO
/****** Object:  Table [dbo].[LegendaryActions]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[LegendaryActions]
GO
/****** Object:  Table [dbo].[Languages]    Script Date: 12/20/2019 3:24:06 PM ******/
DROP TABLE [dbo].[Languages]
GO
/****** Object:  Table [dbo].[InnateSpells]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[InnateSpells]
GO
/****** Object:  Table [dbo].[InnateSpellcastingSpellsPerDays]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[InnateSpellcastingSpellsPerDays]
GO
/****** Object:  Table [dbo].[InnateSpellcastings]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[InnateSpellcastings]
GO
/****** Object:  Table [dbo].[HitEffects]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[HitEffects]
GO
/****** Object:  Table [dbo].[Equipment]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[Equipment]
GO
/****** Object:  Table [dbo].[DiceRolls]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[DiceRolls]
GO
/****** Object:  Table [dbo].[DamageEffectivenessesSets]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[DamageEffectivenessesSets]
GO
/****** Object:  Table [dbo].[ClassSpells]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[ClassSpells]
GO
/****** Object:  Table [dbo].[CastingTimes]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[CastingTimes]
GO
/****** Object:  Table [dbo].[Campaigns]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[Campaigns]
GO
/****** Object:  Table [dbo].[BasicStatsSet]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[BasicStatsSet]
GO
/****** Object:  Table [dbo].[Attacks]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[Attacks]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetUserTokens]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetUsers]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetUserRoles]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetUserLogins]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetUserClaims]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetRoles]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AspNetRoleClaims]
GO
/****** Object:  Table [dbo].[Armors]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[Armors]
GO
/****** Object:  Table [dbo].[ArmorClasses]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[ArmorClasses]
GO
/****** Object:  Table [dbo].[ArmorClassArmors]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[ArmorClassArmors]
GO
/****** Object:  Table [dbo].[Alignments]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[Alignments]
GO
/****** Object:  Table [dbo].[ActionsSets]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[ActionsSets]
GO
/****** Object:  Table [dbo].[Actions]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[Actions]
GO
/****** Object:  Table [dbo].[AbilityScores]    Script Date: 12/20/2019 3:24:07 PM ******/
DROP TABLE [dbo].[AbilityScores]
GO
