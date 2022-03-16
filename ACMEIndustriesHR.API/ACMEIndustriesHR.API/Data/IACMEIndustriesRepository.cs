using ACMEIndustriesHR.API.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace ACMEIndustriesHR.API.Data
{
    public interface IACMEIndustriesRepository
    {
        Employee Login(User userLogin);
        Employee RegisterEmployee(Employee employee);
        void AddEmployee(Employee employee);
        void UpdateEmployee(int id, Employee employee);
        void DeleteEmployee(int id);
        Employee GetEmployeeById(int id);
        List<Employee> GetEmployees();
    }
}
