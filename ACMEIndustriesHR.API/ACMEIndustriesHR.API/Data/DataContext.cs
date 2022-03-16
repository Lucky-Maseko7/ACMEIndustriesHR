using ACMEIndustriesHR.API.Helper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace ACMEIndustriesHR.API.Data
{
    public class DataContext
    {
        IFileManager _fileManager = new FileManager();

        private string _fileString;
        internal JObject jObject;

        public JArray Employees { get; set; }

        public DataContext()
        {
            _fileString = _fileManager.ReadFile(AppSettingManager.FileDirectory);
            jObject = JObject.Parse(_fileString);

            OnModelCreating();
        }

        protected void OnModelCreating()
        {
            try
            {
                if(jObject != null)
                {
                    Employees = (JArray)jObject["Employees"];
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void SaveFile()
        {
            string result = JsonConvert.SerializeObject(jObject, Formatting.Indented);

            _fileManager.WriteToFile(AppSettingManager.FileDirectory, result);
        }

    }
}