
using System.Configuration;

namespace ACMEIndustriesHR.API.Helper
{
    public static class AppSettingManager
    {
        public static string FileDirectory
        {
            get { return ConfigurationManager.AppSettings["FileDirectory"]; }
        }

        public static string ApiSecret
        {
            //const string secretKey = "your secret key goes here";
            get { return ConfigurationManager.AppSettings["ApiSecret"]; }
        }
    }
}