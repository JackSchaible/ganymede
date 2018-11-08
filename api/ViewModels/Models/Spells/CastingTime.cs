namespace api.ViewModels.Models.Spells
{
	public class CastingTime
	{
		public string TimeType { get; set; }
		public string Amount { get; set; }

	    public CastingTime(string timeType, string amount)
	    {
	        TimeType = timeType;
	        Amount = amount;
	    }
	}
}
