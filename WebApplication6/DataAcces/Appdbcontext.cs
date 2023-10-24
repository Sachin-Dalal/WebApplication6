using WebApplication6.ViewModel;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication6.DataAcces
{
    public class Appdbcontext: DbContext
    {
       
            public Appdbcontext(DbContextOptions<Appdbcontext> options) : base(options)
            {

            }

            public dynamic GetCompany(AppViewModel formViewDetails, string UserId)
            {
                try
                {


                    var parameter = new SqlParameter[]{
                new SqlParameter("@UserId", UserId)


                };

                    return (new sqlfunction().ReturnDtWithProc("dbo.GetCompanyName", parameter));
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }

            public dynamic GetBranch(AppViewModel formViewDetails)
            {
                try
                {


                    var parameter = new SqlParameter[]{
               // new SqlParameter("@CompanyId", formViewDetails.CompanyId)


                };

                    return (new sqlfunction().ReturnDtWithProc("dbo.GetBranchName", parameter));
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }

        public dynamic SaveColumnsDetails(AppViewModel formViewDetails)
        {
            try
            {

               

                var parameter = new SqlParameter[]{
                new SqlParameter("@Name", formViewDetails.Name),
                new SqlParameter("@LastName", formViewDetails.LastName),
                new SqlParameter("@status", formViewDetails.status)


                };

                return (new sqlfunction().ReturnDtWithProc("dbo.GetDeleteupdateNameDetails", parameter));
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
