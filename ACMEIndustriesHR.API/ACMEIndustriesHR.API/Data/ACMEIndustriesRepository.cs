
using ACMEIndustriesHR.API.Helper;
using ACMEIndustriesHR.API.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ACMEIndustriesHR.API.Data
{
    public class ACMEIndustriesRepository : IACMEIndustriesRepository
    {
        private readonly DataContext _dataContext = new DataContext();

        public void AddEmployee(Employee employee)
        {
            try
            {
                employee.Id = GenerateId();

                JObject jObject = JObject.FromObject(employee); 

                _dataContext.Employees.Add(jObject);

                _dataContext.jObject["Employees"] = _dataContext.Employees;

                _dataContext.SaveFile();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occured adding company details. \n Message : {ex.Message} \n Exception: {ex.StackTrace}");
                throw ex;
            }
        }

        public Employee RegisterEmployee(Employee employee)
        {
            
            try
            {
                AddEmployee(employee);

                return employee;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occured adding company details. \n Message : {ex.Message} \n Exception: {ex.StackTrace}");
                throw ex;
            }
        }

        public void DeleteEmployee(int id)
        {
            Util.CheckNullParam(id);
            try
            {
                if (id > 0)
                {
                    var employeeToDelete = _dataContext.Employees.FirstOrDefault(emp => emp["Id"].Value<int>() == id);//GetEmployeeById(id);

                    _dataContext.Employees.Remove(employeeToDelete);

                    _dataContext.SaveFile();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occured deleting company details.\n Message : {ex.Message} \n Exception: {ex.StackTrace}");
                throw ex;
            }
        }

        public Employee GetEmployeeById(int id)
        {
            var employeeToke = _dataContext.Employees.FirstOrDefault(emp => emp["Id"].Value<int>() == id);

            return employeeToke.ToObject<Employee>();
        }

        public List<Employee> GetEmployees()
        {
            return (List<Employee>)_dataContext.Employees.ToObject<List<Employee>>();
        }

        public Employee Login(User userLogin)
        {
            var employeeToke = _dataContext.Employees.FirstOrDefault(emp => emp["UserName"].Value<string>().Equals(userLogin.Username) && emp["Password"].Value<string>().Equals(userLogin.Password));

            return employeeToke.ToObject<Employee>();
        }

        public void UpdateEmployee(int id, Employee employee)
        {
            try
            {
                var employeeToke = _dataContext.Employees.FirstOrDefault(obj => obj["Id"].Value<int>() == id);

                employeeToke["UserName"] = employee.UserName;
                employeeToke["Password"] = employee.Password;
                employeeToke["FullName"] = employee.FullName;
                employeeToke["Gender"] = employee.Gender;
                employeeToke["DateOfBirth"] = employee.DateOfBirth;
                employeeToke["CurrentProjects"] = employee.CurrentProjects;
                employeeToke["BusinessRole"] = employee.BusinessRole;
                employeeToke["Address"] = employee.Address;
                employeeToke["PhotoUrl"] = employee.PhotoUrl;

                _dataContext.jObject["Employees"] = _dataContext.Employees;

                _dataContext.SaveFile();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occured updating company details.\n Message : {ex.Message} \n Exception: {ex.StackTrace}");
                throw ex;
            }
        }


        internal int GenerateId()
        {
            var lastId =  _dataContext.Employees.ToObject<List<Employee>>().OrderByDescending(x => x.Id).Select(e => e.Id).FirstOrDefault();
            return lastId + 1;
        }
    }

}