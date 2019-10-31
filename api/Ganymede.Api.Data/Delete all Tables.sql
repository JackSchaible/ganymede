begin tran

drop table SpellComponents
drop table SpellDurations
drop table SpellRanges
drop table SpellSchools
drop table MonsterSpells
drop table Spells
drop table BasicStats
drop table Monsters
drop table Campaigns
drop table Rulesets
drop table Publishers

drop table AspNetUserRoles
drop table AspNetRoleClaims
drop table AspNetRoles
drop table AspNetUserClaims
drop table AspNetUserLogins
drop table AspNetUserTokens
drop table AspNetUsers

rollback tran
