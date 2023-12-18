using WebApplication6.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApplication6.Models;
using System.Data.SqlClient;

namespace WebApplication6.DataAcces
{
    public class Appdbcontext : DbContext
    {

        public Appdbcontext(DbContextOptions<Appdbcontext> options) : base(options)
        {

        }


        public dynamic GetEmp()
        {
            try
            {
                return (new SqlFunctions().ReturnDtWithProc("sp_GetEmp"));
            }
            catch (Exception)
            {
                throw;
            }
        }
        public dynamic SaveEmp(EmpDetails obj)
        {
            try
            {
                var parameter = new SqlParameter[]{
                new SqlParameter("@EmpCode", obj.EmpCode),
                new SqlParameter("@EmpName", obj.EmpName),
                new SqlParameter("@DOB", obj.DOB),
                new SqlParameter("@Gender", obj.Gender),
                new SqlParameter("@Department", obj.Department),
                new SqlParameter("@Designation", obj.Designation),
                new SqlParameter("@BasicSalary", obj.BasicSalary),
                };

                return (new SqlFunctions().ReturnDtWithProc("sp_SaveEmp", parameter));
            }
            catch (Exception)
            {

                throw;
            }
        }
        public dynamic UpdateEmp(EmpDetails obj)
        {
            try
            {
                var parameter = new SqlParameter[]{
                new SqlParameter("@EmpCode", obj.EmpCode),
                new SqlParameter("@EmpName", obj.EmpName),
                new SqlParameter("@DOB", obj.DOB),
                new SqlParameter("@Gender", obj.Gender),
                new SqlParameter("@Department", obj.Department),
                new SqlParameter("@Designation", obj.Designation),
                new SqlParameter("@BasicSalary", obj.BasicSalary),
                };

                return (new SqlFunctions().ReturnDtWithProc("sp_UpdateEmp", parameter));
            }
            catch (Exception)
            {

                throw;
            }
        }
        public dynamic DeleteEmp(EmpDetails obj)
        {
            try
            {
                var parameter = new SqlParameter[]{
                    new SqlParameter("@EmpCode", obj.EmpCode)
                };

                return (new SqlFunctions().ReturnDtWithProc("sp_DeleteEmp", parameter));
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}
