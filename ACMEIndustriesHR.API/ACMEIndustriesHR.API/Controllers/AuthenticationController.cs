using ACMEIndustriesHR.API.Data;
using ACMEIndustriesHR.API.Helper;
using ACMEIndustriesHR.API.Models;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ACMEIndustriesHR.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/auth")]
    public class AuthenticationController : ApiController
    {
        private readonly IACMEIndustriesRepository _repo = new ACMEIndustriesRepository();

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody]User userLogin)
        {
            if (string.IsNullOrEmpty(userLogin.Username) || string.IsNullOrEmpty(userLogin.Password))
                return BadRequest("Enter your username and password");

            Employee employee = _repo.Login(userLogin);

            return Ok(Util.CreateToken(employee));
        }

        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register([FromBody]Employee employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            try
            {

                var newEmployee = _repo.RegisterEmployee(employee);

                return Ok(Util.CreateToken(newEmployee));

            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
