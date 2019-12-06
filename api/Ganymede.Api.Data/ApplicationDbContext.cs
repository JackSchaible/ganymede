using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Data.Spells;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Ganymede.Api.Data.Equipment.Weapons;
using Ganymede.Api.Data.Characters;
using Ganymede.Api.Data.Monsters.Actions;

namespace Ganymede.Api.Data
{
	public class ApplicationDbContext : IdentityDbContext<AppUser>
	{
		public DbSet<Campaign> Campaigns { get; set; }

        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Ruleset> Rulesets { get; set; }

        public DbSet<DiceRoll> DiceRolls { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public DbSet<PlayerClass> PlayerClasses { get; set; }

        public DbSet<Action> Actions { get; set; }
        public DbSet<ActionsSet> ActionsSets { get; set; }
        public DbSet<Attack> Attacks { get; set; }
        public DbSet<HitEffect> HitEffects { get; set; }
        public DbSet<LegendaryAction> LegendaryActions { get; set; }
        public DbSet<LegendaryActionsSet> LegendaryActionsSets { get; set; }
        public DbSet<PerDayAction> PerDayActions { get; set; }
        public DbSet<RechargeAction> RechargeActions { get; set; }

        public DbSet<Monster> Monsters { get; set; }
        public DbSet<MonsterTag> MonsterTags { get; set; }
        public DbSet<MonsterAlignment> MonsterAlignments { get; set; }
        public DbSet<MonsterType> MonsterTypes { get; set; }
        public DbSet<Alignment> Alignments { get; set; }

        public DbSet<Armor> Armors { get; set; }
        public DbSet<Equipment.Equipment> Equipments { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<WeaponWeaponProperties> WeaponWeaponProperties { get; set; }
        public DbSet<WeaponProperty> WeaponProperties { get; set; }

        public DbSet<ArmorClass> ArmorClasses { get; set; }
        public DbSet<ArmorClassArmor> ArmorClassArmors { get; set; }
        public DbSet<MonsterMovement> MonsterMovements { get; set; }

        public DbSet<AbilityScores> AbilityScores { get; set; }

        public DbSet<MonsterLanguage> MonsterLanguages { get; set; }
        public DbSet<MonsterLanguageSet> MonsterLanguagesSets { get; set; }

        public DbSet<DamageEffectivenessSet> DamageEffectivenessesSets { get; set; }
        public DbSet<MonsterSavingThrowSet> MonsterSavingThrowSets { get; set; }
        public DbSet<MonsterSkillSet> MonsterSkillSets { get; set; }
        public DbSet<OptionalStatsSet> OptionalStats { get; set; }

        public DbSet<InnateSpell> InnateSpells { get; set; }
        public DbSet<InnateSpellcasting> InnateSpellcastings { get; set; }
        public DbSet<InnateSpellcastingSpellsPerDay> InnateSpellcastingSpellsPerDays { get; set; }
        public DbSet<MonsterSpellcasting> MonsterSpellcastings { get; set; }
        public DbSet<Spellcaster> Spellcasters { get; set; }
        public DbSet<SpellcasterSpells> SpellcasterSpells { get; set; }

        public DbSet<Spell> Spells { get; set; }
        public DbSet<CastingTime> CastingTimes { get; set; }
        public DbSet<SpellComponents> SpellComponents { get; set; }
        public DbSet<SpellDuration> SpellDurations { get; set; }
        public DbSet<SpellRange> SpellRanges { get; set; }
        public DbSet<SpellSchool> SpellSchools { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
		{
            builder.Entity<Equipment.Equipment>().ToTable("Equipment");

            builder.Entity<Publisher>()
                .HasIndex(p => p.Name)
                .IsUnique();

            builder.Entity<Ruleset>()
                .HasIndex(r => r.Abbrevation)
                .IsUnique();

            builder.Entity<DiceRoll>()
                .HasIndex(dr => new { dr.Number, dr.Sides })
                .IsUnique();

            ConfigureMonsterTags(builder);
            ConfigureMonsterAlignments(builder);
            ConfigureArmorClassArmors(builder);
            ConfigureMonsterLanguages(builder);
            ConfigureMonsterSkills(builder);
            ConfigureMonsterInnateSpells(builder);
            ConfigureSpellcasterSpells(builder);
            ConfigureClassSpells(builder);
            ConfigureMonsterEquipment(builder);
            ConfigureWeaponProperties(builder);

            base.OnModelCreating(builder);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.UseSqlServer(@"Server=.;Database=Ganymede;Trusted_Connection=True;",
					opts => opts.EnableRetryOnFailure(3));
		}

        private void ConfigureMonsterTags(ModelBuilder builder)
        {
            builder.Entity<MonsterTag>()
                .HasKey(mt => new { mt.MonsterID, mt.TagID });
            builder.Entity<MonsterTag>()
                .HasOne(ms => ms.Monster)
                .WithMany(m => m.Tags)
                .HasForeignKey(ms => ms.MonsterID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterTag>()
                .HasOne(mt => mt.Tag)
                .WithMany(t => t.MonsterTags)
                .HasForeignKey(mt => mt.TagID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Monster>()
                .HasMany(m => m.Tags)
                .WithOne(mt => mt.Monster)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Tag>()
                .HasMany(t => t.MonsterTags)
                .WithOne(mt => mt.Tag)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureMonsterAlignments(ModelBuilder builder)
        {
            builder.Entity<MonsterAlignment>()
                .HasKey(ma => new { ma.MonsterID, ma.AlignmentID });
            builder.Entity<MonsterAlignment>()
                .HasOne(ma => ma.Monster)
                .WithMany(m => m.Alignments)
                .HasForeignKey(ma => ma.MonsterID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterAlignment>()
                .HasOne(ma => ma.Alignment)
                .WithMany(a => a.Monsters)
                .HasForeignKey(ma => ma.AlignmentID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Monster>()
                .HasMany(m => m.Alignments)
                .WithOne(ma => ma.Monster)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Alignment>()
                .HasMany(a => a.Monsters)
                .WithOne(ma => ma.Alignment)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureArmorClassArmors(ModelBuilder builder)
        {
            builder.Entity<ArmorClassArmor>()
                .HasKey(aca => new { aca.ArmorID, aca.ArmorClassID });
            builder.Entity<ArmorClassArmor>()
                .HasOne(aca => aca.ArmorClass)
                .WithMany(ac => ac.ArmorClassArmors)
                .HasForeignKey(aca => aca.ArmorClassID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ArmorClassArmor>()
                .HasOne(aca => aca.Armor)
                .WithMany(a => a.ArmorClassArmors)
                .HasForeignKey(aca => aca.ArmorID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ArmorClass>()
                .HasMany(ac => ac.ArmorClassArmors)
                .WithOne(aca => aca.ArmorClass)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Armor>()
                .HasMany(a => a.ArmorClassArmors)
                .WithOne(aca => aca.Armor)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureMonsterLanguages(ModelBuilder builder)
        {
            builder.Entity<MonsterLanguage>()
                .HasKey(ml => new { ml.LanguageID, ml.MonsterLanguageSetID });
            builder.Entity<MonsterLanguage>()
                .HasOne(ml => ml.Language)
                .WithMany(l => l.MonsterLanguages)
                .HasForeignKey(ml => ml.LanguageID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterLanguage>()
                .HasOne(ml => ml.MonsterLanguageSet)
                .WithMany(mls => mls.Languages)
                .HasForeignKey(ml => ml.MonsterLanguageSetID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterLanguageSet>()
                .HasMany(mls => mls.Languages)
                .WithOne(ml => ml.MonsterLanguageSet)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Language>()
                .HasMany(l => l.MonsterLanguages)
                .WithOne(ml => ml.Language)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureMonsterSkills(ModelBuilder builder)
        {
            builder.Entity<MonsterSkillSet>()
                .HasKey(mss => new { mss.SkillID, mss.OptionalStatsID });
            builder.Entity<MonsterSkillSet>()
                .HasOne(mss => mss.Skill)
                .WithMany(s => s.MonsterSkills)
                .HasForeignKey(mss => mss.SkillID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterSkillSet>()
                .HasOne(mss => mss.OptionalStats)
                .WithMany(os => os.Skills)
                .HasForeignKey(mss => mss.OptionalStatsID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<OptionalStatsSet>()
                .HasMany(os => os.Skills)
                .WithOne(s => s.OptionalStats)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Skill>()
                .HasMany(s => s.MonsterSkills)
                .WithOne(ms => ms.Skill)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureMonsterInnateSpells(ModelBuilder builder)
        {
            builder.Entity<InnateSpellcastingSpellsPerDay>()
                .HasIndex(isspd => new { isspd.NumberPerDay, isspd.SpellcastingID })
                .IsUnique();

            builder.Entity<InnateSpellcastingSpellsPerDay>()
                .HasOne(isspd => isspd.Spellcasting)
                .WithMany(sc => sc.SpellsPerDay)
                .HasForeignKey(isspd => isspd.SpellcastingID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<InnateSpellcastingSpellsPerDay>()
                .HasMany(isspd => isspd.Spells)
                .WithOne(s => s.InnateSpellcastingSpellsPerDay)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<InnateSpell>()
                .HasKey(ins => new { ins.SpellID, ins.InnateSpellcastingSpellsPerDayID });
            builder.Entity<InnateSpell>()
                .HasOne(ins => ins.InnateSpellcastingSpellsPerDay)
                .WithMany(sspd => sspd.Spells)
                .HasForeignKey(ins => ins.InnateSpellcastingSpellsPerDayID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<InnateSpell>()
                .HasOne(ins => ins.Spell)
                .WithMany(s => s.InnateSpells)
                .HasForeignKey(ins => ins.SpellID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Spell>()
                .HasMany(s => s.InnateSpells)
                .WithOne(ins => ins.Spell)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureSpellcasterSpells(ModelBuilder builder)
        {
            builder.Entity<SpellcasterSpells>()
                .HasKey(ss => new { ss.SpellcasterID, ss.SpellID });
            builder.Entity<SpellcasterSpells>()
                .HasOne(ss => ss.Spellcaster)
                .WithMany(sc => sc.PreparedSpells)
                .HasForeignKey(ss => ss.SpellcasterID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<SpellcasterSpells>()
                .HasOne(ss => ss.Spell)
                .WithMany(s => s.SpellcasterSpells)
                .HasForeignKey(ss => ss.SpellID)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Spell>()
                .HasMany(s => s.SpellcasterSpells)
                .WithOne(ss => ss.Spell)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureMonsterEquipment(ModelBuilder builder)
        {
            builder.Entity<MonsterEquipment>()
                .HasKey(me => new { me.MonsterID, me.EquipmentID });
            builder.Entity<MonsterEquipment>()
                .HasOne(me => me.Equipment)
                .WithMany(e => e.Monsters)
                .HasForeignKey(me => me.EquipmentID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MonsterEquipment>()
                .HasOne(me => me.Monster)
                .WithMany(m => m.Equipment)
                .HasForeignKey(me => me.MonsterID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Monster>()
                .HasMany(m => m.Equipment)
                .WithOne(me => me.Monster)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Equipment.Equipment>()
                .HasMany(e => e.Monsters)
                .WithOne(me => me.Equipment)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureWeaponProperties(ModelBuilder builder)
        {
            builder.Entity<WeaponWeaponProperties>()
                .HasKey(wwp => new { wwp.WeaponID, wwp.WeaponPropertyID });
            builder.Entity<WeaponWeaponProperties>()
                .HasOne(wwp => wwp.Weapon)
                .WithMany(w => w.WeaponWeaponProperties)
                .HasForeignKey(wwp => wwp.WeaponID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WeaponWeaponProperties>()
                .HasOne(wwp => wwp.WeaponProperty)
                .WithMany(wp => wp.WeaponWeaponProperties)
                .HasForeignKey(wwp => wwp.WeaponPropertyID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Weapon>()
                .HasMany(w => w.WeaponWeaponProperties)
                .WithOne(wwp => wwp.Weapon)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<WeaponProperty>()
                .HasMany(wp => wp.WeaponWeaponProperties)
                .WithOne(wwp => wwp.WeaponProperty)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void ConfigureClassSpells(ModelBuilder builder)
        {
            builder.Entity<ClassSpell>()
                .HasKey(cs => new { cs.PlayerClassID, cs.SpellID });
            builder.Entity<ClassSpell>()
                .HasOne(cs => cs.Class)
                .WithMany(c => c.ClassSpells)
                .HasForeignKey(cs => cs.PlayerClassID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ClassSpell>()
                .HasOne(cs => cs.Spell)
                .WithMany(s => s.ClassSpells)
                .HasForeignKey(cs => cs.SpellID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PlayerClass>()
                .HasMany(pc => pc.ClassSpells)
                .WithOne(cs => cs.Class)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Spell>()
                .HasMany(s => s.ClassSpells)
                .WithOne(cs => cs.Spell)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
