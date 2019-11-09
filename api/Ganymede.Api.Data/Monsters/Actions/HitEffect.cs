using Ganymede.Api.Data.Common;

namespace Ganymede.Api.Data.Monsters.Actions
{
    public class HitEffect
    {
        public int ID { get; set; }
        public DiceRoll Damage { get; set; }
        // TODO: Factor in creature size to damage Big monsters typically wield oversized weapons that deal extra dice of damage on a hit. Double the weapon dice if the creature is Large, triple the weapon dice if the creature is Huge, quadruple the weapon dice if it's Gargantuan. A creature has disadvantage on attack rolls with a weapon that is sized for a larger attacker.You can rule that a weapon sized for an attacker two or more sizes larger is too big for the creature to use at all.
        public int DamageType { get; set; }
        public string ExtraEffect { get; set; }
        public string Condition { get; set; }
    }
}
