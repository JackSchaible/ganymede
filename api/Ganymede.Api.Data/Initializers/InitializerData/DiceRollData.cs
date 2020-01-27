using Ganymede.Api.Data.Common;
using System.Collections.Generic;

namespace Ganymede.Api.Data.Initializers.InitializerData
{
    internal class DiceRollData
    {
        public List<DiceRoll> All { get; set; }
        public DiceRoll OneDFour { get; set; }
        public DiceRoll OneDSix { get; set; }
        public DiceRoll OneDEight { get; set; }
        public DiceRoll OneDTen { get; set; }
        public DiceRoll OneDTwelve { get; set; }
        public DiceRoll OneDTwenty { get; set; }
        public DiceRoll TwoDSix { get; set; }
        public DiceRoll TwoDEight { get; set; }
        public DiceRoll TwoDTen { get; set; }
        public DiceRoll FourDSix { get; set; }
        public DiceRoll ElevenDEight { get; set; }
        public DiceRoll TwelveDEight { get; set; }
        public DiceRoll FifteenDTwelve { get; set; }
        public DiceRoll NinteenDTen { get; set; }
        public DiceRoll TwentyEightDTwenty { get; set; }
    }
}
