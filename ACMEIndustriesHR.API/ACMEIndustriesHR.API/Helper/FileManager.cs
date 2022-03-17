using System;
using System.IO;

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

        public void DirectoryValidation()
        {
            try
            {
                if (!Directory.Exists(AppSettingManager.FileDirectory))
                {
                    Directory.CreateDirectory(AppSettingManager.FileDirectory);
                }
            }
            catch (Exception exception)
            {

            }
        }


        public void FileValidation() {
            string path = AppSettingManager.FileDirectory + AppSettingManager.FileName;

            if (!File.Exists(path))
            {  
                using (StreamWriter sw = File.CreateText(path)) {
                    string employee = "{ \"Employees\": [ { \"Id\": 2,\"UserName\": \"Chris\",\"Password\": \"1345\",\"FullName\": \"Chris Tucker\",\"Gender\": \"Male\",\"DateOfBirth\": \"1887-03-23T00:00:00\",\"CurrentProjects\": \"QA, UAT, PROD\",\"ReportingLine\": \"State\",\"BusinessRole\": \"Manager\", \"Address\": \"RSA\",\"PhotoUrl\": \"Tucker.jpg\"}]}";
                    sw.Write(employee);
                }
            }
        }
    }
}