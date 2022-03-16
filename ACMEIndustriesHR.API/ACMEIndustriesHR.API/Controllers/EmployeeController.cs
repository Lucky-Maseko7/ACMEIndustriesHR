using ACMEIndustriesHR.API.Data;
using ACMEIndustriesHR.API.Models;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ACMEIndustriesHR.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/employee")]
    public class EmployeeController : ApiController
    {
        private readonly IACMEIndustriesRepository _repo = new ACMEIndustriesRepository();

        [HttpGet]
        public IHttpActionResult GetEmployees()
        {
            try
            {
                return Ok(_repo.GetEmployees());
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetEmployeesById(int id)
        {
            try
            {
                if (id < 0) return BadRequest("Employee id is null");

                var existingUser = _repo.GetEmployeeById(id);

                return Ok(existingUser);
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured when adding");
            }
        }

        [HttpPost]
        public IHttpActionResult PostEmployees([FromBody]Employee employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                if (employee == null) return BadRequest("Pass some data");

                var existingUser = _repo.GetEmployees().Any(n => n.UserName == employee.UserName);
                if (existingUser) return BadRequest("User already existing");

                _repo.RegisterEmployee(employee);

                return Ok("Entry was created");
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured when adding");
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateEmployee(int id, [FromBody]Employee employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != employee.Id || employee == null) return BadRequest("Pass some data");

            try
            {
                _repo.UpdateEmployee(id, employee);
                return Ok("Entry updated!");
            }
            catch (Exception exception)
            {
                return BadRequest("Error occured when update employee");
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteEmployee(int id)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (id < 0) return BadRequest();

                _repo.DeleteEmployee(id);
                return Ok("Entry deleted");
            }
            catch (Exception exception)
            {
                return BadRequest("Error occured when delete employee");
            }
        }

    }
}
