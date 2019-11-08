using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Equipment;
using Ganymede.Api.Data.Monster;
using Ganymede.Api.Data.Monster.BasicStats;
using Ganymede.Api.Data.Monsters;
using Ganymede.Api.Data.Monsters.BasicStats;
using Ganymede.Api.Data.Monsters.OptionalStats;
using Ganymede.Api.Data.Monsters.OptionalStats.Languages;
using Ganymede.Api.Data.Monsters.SpecialTraits.Spellcasting;
using Ganymede.Api.Data.Rulesets;
using Ganymede.Api.Data.Spells;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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

        public DbSet<Monster> Monsters { get; set; }
        public DbSet<MonsterType> MonsterTypes { get; set; }
        public DbSet<Alignment> Alignments { get; set; }

        public DbSet<ArmorClass> ArmorClasses { get; set; }
        public DbSet<Armor> Armors { get; set; }
        public DbSet<ArmorClassArmor> ArmorClassArmors { get; set; }
        public DbSet<MonsterMovement> MonsterMovements { get; set; }

        public DbSet<AbilityScores> AbilityScores { get; set; }

        public DbSet<MonsterLanguage> MonsterLanguages { get; set; }
        public DbSet<MonsterLanguageSet> MonsterLanguagesSets { get; set; }

        public DbSet<DamageEffectivenessSet> DamageEffectivenessesSets { get; set; }
        public DbSet<MonsterSavingThrowSet> MonsterSavingThrowSets { get; set; }
        public DbSet<MonsterSkillSet> MonsterSkillSets { get; set; }
        public DbSet<OptionalStatsSet> OptionalStats { get; set; }

        public DbSet<InnateSpellcastingSpellsPerDay> InnateSpellcastingSpellsPerDays { get; set; }
        public DbSet<InnateSpell> InnateSpells { get; set; }

        public DbSet<Spell> Spells { get; set; }
        public DbSet<CastingTime> CastingTimes { get; set; }
        public DbSet<SpellComponents> SpellComponents { get; set; }
        public DbSet<SpellDuration> SpellDurations { get; set; }
        public DbSet<SpellRange> SpellRanges { get; set; }
        public DbSet<SpellSchool> SpellSchools { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
		{
            builder.Entity<Publisher>()
                .HasIndex(p => p.Name)
                .IsUnique();

            builder.Entity<Ruleset>()
                .HasIndex(r => r.Abbrevation)
                .IsUnique();

            builder.Entity<DiceRoll>()
                .HasKey(dr => new { dr.Number, dr.Sides });

            ConfigureMonsterTags(builder);
            ConfigureArmorClassArmors(builder);
            ConfigureMonsterLanguages(builder);
            ConfigureMonsterSkills(builder);
            ConfigureMonsterInnateSpells(builder);

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
                .HasKey(isspd => new { isspd.NumberPerDay, isspd.SpellcastingID });
            builder.Entity<InnateSpellcastingSpellsPerDay>()
                .HasOne(isspd => isspd.Spellcasting)
                .WithMany(sc => sc.SpellsPerDay)
                .HasForeignKey(isspd => isspd.SpellcastingID)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<InnateSpell>()
                .HasKey(ins => new { ins.SpellID, ins.InnateSpellcastingSpellsPerDayID });
            builder.Entity<InnateSpell>()
                .HasOne(ins => ins.SpellcastingSpellsPerDay)
                .WithMany(sspd => sspd.Spells)
                .HasForeignKey(ins => ins.InnateSpellcastingSpellsPerDayID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<InnateSpell>()
                .HasOne(ins => ins.Spell)
                .WithMany(s => s.InnateSpells)
                .HasForeignKey(ins => ins.SpellID)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<InnateSpellcastingSpellsPerDay>()
                .HasMany(isspd => isspd.Spells)
                .WithOne(s => s.SpellcastingSpellsPerDay)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Spell>()
                .HasMany(s => s.InnateSpells)
                .WithOne(ins => ins.Spell)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
