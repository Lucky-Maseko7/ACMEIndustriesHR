using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ACMEIndustriesHR.API.Helper
{
    public class CloudinaryManager
    {
        public Account account { get; set; }

        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(@"c:\my_image.jpg")
        };
        var uploadResult = cloudinary.Upload(uploadParams);

    }

    public class Account
    {
        public string CloudName { get; set; }
        public string CloudAPIKey { get; set; }
        public string CloudAPISecret { get; set; }
        public Account(string cloudName, string cloudAPIKey, string cloudAPISecret)
        {
            CloudAPIKey = cloudName;
            CloudAPIKey = cloudAPIKey;
            CloudAPISecret = CloudAPISecret;
        }
    }
}