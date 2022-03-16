using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ACMEIndustriesHR.API.Models
{
    public class JwtPackage
    {
        public string Token { get; set; }
        public Employee Employee { get; set; }
    }
}