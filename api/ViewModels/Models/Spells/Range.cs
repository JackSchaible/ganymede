namespace api.ViewModels.Models.Spells
{
	public class Range
	{
		public string RangeType { get; set; }
		public string Amount { get; set; }

	    public Range(string rangeType, string amount)
	    {
	        RangeType = rangeType;
	        Amount = amount;
	    }
	}
}
