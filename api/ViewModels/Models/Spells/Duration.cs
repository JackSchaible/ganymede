namespace api.ViewModels.Models.Spells
{
	public class Duration
	{
		public string DurationType { get; set; }
		public string Length { get; set; }
		public bool Concentration { get; set; }

	    public Duration(string durationType, string length, bool concentration)
	    {
	        DurationType = durationType;
	        Length = length;
	        Concentration = concentration;
	    }
	}
}
