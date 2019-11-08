namespace Ganymede.Api.Models.Common
{
    public class DiceRollModel
    {
        public int Number { get; set; }
        public CommonEnums.DiceTypes Sides { get; set; }
    }
}
