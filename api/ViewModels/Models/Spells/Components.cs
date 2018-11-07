namespace api.ViewModels.Models.Spells
{
	public class Components
	{
		public bool Verbal { get; set; }
		public bool Somatic { get; set; }
		public string Material { get; set; }

	    public Components(bool verbal, bool somatic, string material)
	    {
	        Verbal = verbal;
	        Somatic = somatic;
	        Material = material;
	    }
	}
}
