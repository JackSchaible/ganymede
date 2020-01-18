namespace Ganymede.Api.Extensions
{
    public static class StringExtensions
    {
        public static string Capitalize(this string s)
        {
            if (string.IsNullOrWhiteSpace(s)) return s;

            if (s.Length == 1)
                return s.ToUpperInvariant();
            else
                return s[0].ToString().ToUpperInvariant() + s.Substring(1);
        }
    }
}
