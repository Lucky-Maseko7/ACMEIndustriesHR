
using System.Configuration;

namespace ACMEIndustriesHR.API.Helper
{
    public static class AppSettingManager
    {
        public static string FileDirectory
        {
            get { return ConfigurationManager.AppSettings["FileDirectory"]; }
        }

        public static string FileName
        {
            get { return ConfigurationManager.AppSettings["FileName"]; }
        }

        public static string ApiSecret
        {
            //const string secretKey = "your secret key goes here";
            get { return ConfigurationManager.AppSettings["ApiSecret"]; }
        }

        public static string CloudName
        {
            //const string secretKey = "your secret key goes here";
            get { return ConfigurationManager.AppSettings["CloudName"]; }
        }

        public static string CloudAPIKey
        {
            //const string secretKey = "your secret key goes here";
            get { return ConfigurationManager.AppSettings["CloudAPIKey"]; }
        }

        public static string CloudAPISecret
        {
            //const string secretKey = "your secret key goes here";
            get { return ConfigurationManager.AppSettings["CloudAPISecret"]; }
        }

        public static string CloudAPIEnvironmentVariable
        {
            //const string secretKey = "your secret key goes here";
            get { return ConfigurationManager.AppSettings["CloudAPIEnvironmentVariable"]; }
        }
    }
}