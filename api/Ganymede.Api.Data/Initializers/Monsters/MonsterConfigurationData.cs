using Ganymede.Api.Data.Common;
using Ganymede.Api.Data.Monsters;

namespace Ganymede.Api.Data.Initializers.Monsters
{
    internal class MonsterConfigurationData
    {
        internal static class MonstersConstants
        {
            public const int AStr = 0;
            public const int ADex = 1;
            public const int ACon = 2;
            public const int AInt = 3;
            public const int AWis = 4;
            public const int ACha = 5;

            public const int DTAcid = 0;
            public const int DTBludgeoning = 1;
            public const int DTCold = 2;
            public const int DTFire = 3;
            public const int DTForce = 4;
            public const int DTLightning = 5;
            public const int DTNecrotic = 6;
            public const int DTPiercing = 7;
            public const int DTPoison = 8;
            public const int DTPsychic = 9;
            public const int DTRadiant = 10;
            public const int DTSlashing = 11;
            public const int DTThunder = 12;

            public static MonsterType MTAbberation;
            public static MonsterType MTBeast;
            public static MonsterType MTCelestial;
            public static MonsterType MTConstruct;
            public static MonsterType MTDragon;
            public static MonsterType MTElemental;
            public static MonsterType MTFey;
            public static MonsterType MTFiend;
            public static MonsterType MTGiant;
            public static MonsterType MTHumanoid;
            public static MonsterType MTMonstrosity;
            public static MonsterType MTOoze;
            public static MonsterType MTPlant;
            public static MonsterType MTUndead;

            public const int STiny = 0;
            public const int SSmall = 1;
            public const int SMedium = 2;
            public const int SLarge = 3;
            public const int SHuge = 4;
            public const int SGargantuan = 5;

            public const int SCTInnate = 0;
            public const int SCTSpellcaster = 1;

            public const int TCreature = 0;
            public const int TTarget = 1;

            public const int WAMelee = 0;
            public const int WARanged = 1;

            public static Tag TElf;
            public static Tag THuman;
            public static Tag TAnyRace;

            public const int CBlinded = 0;
            public const int CCharmed = 1;
            public const int CDeafened = 2;
            public const int CFatigues = 3;
            public const int CFrightened = 4;
            public const int CGrappled = 5;
            public const int CIncapacitated = 6;
            public const int CInvisible = 7;
            public const int CParalyzed = 8;
            public const int CPetrified = 9;
            public const int CPoisoned = 10;
            public const int CProne = 11;
            public const int CRestrained = 12;
            public const int CStunned = 13;
            public const int CUnconscious = 14;

            public const int RCRoll = 0;
            public const int RCLongRest = 1;
            public const int RCShortRest = 2;
        }
    }
}
