using Ganymede.Api.Data.Spells;
using System.Collections.Generic;

namespace Ganymede.Api.Models.App.FormData
{
    public class SpellFormData
    {
        public List<SpellSchool> Schools { get; set; }
        public List<string> CastingTimeUnits { get; set; }
    }
}
