using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACMEIndustriesHR.API.Helper
{
    interface IFileManager
    {
        string ReadFile(string filePath);
        void WriteToFile(string filePath, string newContent);

    }
}
