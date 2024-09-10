using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication6.Models
{
    public class EmpDetails
    {
        public int EmpId { get; set; }
        public int EmpCode { get; set; }
        public string EmpName { get; set; }
        public string DOB { get; set; }
        public int Gender { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string BasicSalary { get; set; }
        public int Code { get; set; }
        public string Message { get; set; }
    }


    public class CertificateDetails
    {
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string EmailId { get; set; }
        public string CurrentDate { get; set; }
    }


    public class Response
    {
        public int Code { get; set; }
    }

}
