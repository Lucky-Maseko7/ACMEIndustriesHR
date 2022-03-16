

using ACMEIndustriesHR.API.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ACMEIndustriesHR.API.Helper
{
    public static class Util
    {
        
        internal static string[] GetProjects(string unformedString)
        {
            return unformedString.Split(',');
        }

        internal static void CheckNullParam(object obj)
        {
            if (obj == null) throw new ArgumentException("Employee ID is can not be empty");
        }

        internal static JwtPackage CreateToken(Employee employee)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Email, employee.Password)
            });
            
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(AppSettingManager.ApiSecret));
            var signinCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(
                    subject: claims,
                    signingCredentials: signinCredentials
                );

            var tokenString = tokenHandler.WriteToken(token);

            return new JwtPackage()
            {
                Employee = employee,
                Token = tokenString
            };
        }
    }
}