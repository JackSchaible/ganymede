using Ganymede.Api.Data.Spells;
using Ganymede.Api.Models.Spells;
using System.Collections.Generic;
using static Ganymede.Api.Models.Spells.Enums;

namespace Ganymede.Api.Models.App.FormData
{
    public class SpellFormData
    {
        public List<SpellSchoolModel> Schools { get; set; }
        public List<CastingTimeType> CastingTimeTypes { get; set; }
        public List<string> CastingTimeUnits { get; set; }
        public List<RangeType> RangeTypes { get; set; }
        public List<string> RangeUnits { get; set; }
        public List<string> RangeShapes { get; set; }
        public List<string> DurationUnits { get; set; }
        public List<DurationType> DurationTypes { get; set; }
    }
}
