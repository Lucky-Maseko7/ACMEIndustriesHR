using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ACMEIndustriesHR.API.Helper
{
    public class CloudinaryManager : ICloudinaryManager
    {
        public Account account = new Account(AppSettingManager.CloudName, AppSettingManager.CloudAPIKey, AppSettingManager.ApiSecret);

        Cloudinary cloudinary;

        public CloudinaryManager()
        {
            cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;
        }

        public ImageUploadResult ImageUpload(string filePath)
        {
            try
            {
                if (file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(file.Name, stream),
                            Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                        };

                        return cloudinary.Upload(uploadParams);
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            //RESPONSE(ImageUploadResult):
            //{
            //   "public_id":"tquyfignx5bxcbsupr6a",
            //    "version":1375302801,
            //    "signature":"52ecf23eeb987b3b5a72fa4ade51b1c7a1426a97",
            //    "width":1920,
            //    "height":1200,
            //    "format":"jpg",
            //    "resource_type":"image",
            //    "created_at":"2017-07-31T20:33:21Z",
            //    "bytes":737633,
            //    "type":"upload",
            //    "url":
            //        "https://res.cloudinary.com/demo/image/upload/v1375302801/tquyfignx5bxcbsupr6a.jpg",
            //    "secure_url":
            //        "https://res.cloudinary.com/demo/image/upload/v1375302801/tquyfignx5bxcbsupr6a.jpg"
            //}
        }


    }

}