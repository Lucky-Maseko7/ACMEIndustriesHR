
using ACMEIndustriesHR.API.Helper;
using System.Web;
using System.Web.Http;

namespace ACMEIndustriesHR.API
{
    public class WebApiApplication : HttpApplication
    {
        IFileManager fileManager = new FileManager();
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            fileManager.DirectoryValidation();
            fileManager.FileValidation();
        }
    }
}
