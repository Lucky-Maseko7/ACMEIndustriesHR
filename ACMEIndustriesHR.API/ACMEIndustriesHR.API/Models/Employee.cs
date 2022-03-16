using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace ACMEIndustriesHR.API.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string CurrentProjects { get; set; }
        public string ReportingLine { get; set; }
        public string BusinessRole { get; set; }
        public string Address { get; set; }
        public string PhotoUrl { get; set; }

        public Employee()
        {

        }

    }
}