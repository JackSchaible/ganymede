using Ganymede.Api.Models.Equipment;
using System.Collections.Generic;

namespace Ganymede.Api.Models.Monster.BasicStats
{
    public class ArmorClassModel
    {
        public int ID { get; set; }
        public List<ArmorModel> ArmorItems { get; set; }
        public int NaturalArmorModifier { get; set; }
    }
}
