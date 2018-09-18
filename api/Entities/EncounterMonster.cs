namespace api.Entities
{
	public class EncounterMonster
	{
		public int EncounterMonsterId { get; set; }

		public int EncounterId { get; set; }
		public Encounter Encounter { get; set; }

		public int MonsterId { get; set; }
		public Monster Monster { get; set; }
	}
}
