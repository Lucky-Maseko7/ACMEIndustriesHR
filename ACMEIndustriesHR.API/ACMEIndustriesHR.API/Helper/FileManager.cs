using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ACMEIndustriesHR.API.Helper
{
    public class FileManager : IFileManager
    {
        public string ReadFile(string filePath)
        {
            return File.ReadAllText(filePath);
        }

        public void WriteToFile(string filePath, string newContent)
        {
            File.WriteAllText(filePath, newContent);
        }
    }
}