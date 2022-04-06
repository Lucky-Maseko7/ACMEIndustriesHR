
using CloudinaryDotNet.Actions;

namespace ACMEIndustriesHR.API.Helper
{
    interface ICloudinaryManager
    {
        ImageUploadResult ImageUpload(string filePath);
    }
}
