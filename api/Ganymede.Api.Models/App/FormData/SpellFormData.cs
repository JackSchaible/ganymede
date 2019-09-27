﻿using Ganymede.Api.Data.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.App.FormData
{
    public class SpellFormData
    {
        public List<SpellSchool> Schools { get; set; }
        public List<string> CastingTimeUnits { get; set; }
        public List<string> RangeTypes { get; set; }
        public List<string> RangeUnits { get; set; }
        public List<string> RangeShapes { get; set; }
        public List<string> Durations { get; set; }
    }
}
