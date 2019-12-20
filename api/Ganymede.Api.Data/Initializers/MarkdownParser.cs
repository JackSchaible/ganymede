using HtmlAgilityPack;
using Markdig;
using System.Collections.Generic;
using System.IO;

namespace Ganymede.Api.Data.Initializers
{
    internal class MarkdownParser
    {
        private string _dataDirectory;
        public MarkdownParser(string rootPath)
        {
            _dataDirectory = Path.Combine(rootPath, "Sources");
        }

        public IEnumerable<string> ListFiles(string directory) => Directory.EnumerateFiles(Path.Combine(_dataDirectory, directory));

        public HtmlDocument ParseFile(string filename)
        {
            string fileString = GetFile(filename);

            var htmlString = Markdown.ToHtml(fileString);
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(htmlString);

            return htmlDoc;
        }

        private string GetFile(string filename)
        {
            string fileString;

            using (var fs = File.OpenRead(filename))
            using (var sr = new StreamReader(fs))
                fileString = sr.ReadToEnd();

            return fileString;
        }
    }
}
