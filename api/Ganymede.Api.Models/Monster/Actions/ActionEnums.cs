﻿namespace Ganymede.Api.Models.Monster.Actions
{
    public class ActionEnums
    {
        public enum AttackTypes
        {
            Melee,
            Ranged
        }

        public enum TargetTypes
        {
            Creature,
            Target
        }

        public enum DamageTypes
        {
            Acid,
            Bludgeoning,
            Cold,
            Fire,
            Force,
            Lightning,
            Necrotic,
            Piercing,
            Poison,
            Psychic,
            Radiant,
            Slashing,
            Thunder
        }

        public enum RechargeConditions
        {
            Roll,
            LongRest,
            ShortRest
        }
    }
}