using WebApplication6.DataAcces;
using WebApplication6.Interface;
using WebApplication6.ViewModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using WebApplication6.Models;

namespace WebApplication6.Repository
{
 
    public class AppRepository : ErpInterface
    {
        private readonly Appdbcontext context;
        private readonly IConfiguration _configuration;

        private readonly ISession session;

        public AppRepository(Appdbcontext context, IConfiguration configuration)
        {
            //IConfiguration configuration

            this.context = context;
            this._configuration = configuration;


        }



        //public dynamic GetBranch(AppViewModel formViewDetails)
        //{

        //    ResponseViewModel model = new ResponseViewModel();

        //    List<ResponseViewModel> newmodel = new List<ResponseViewModel>();

        //    try
        //    {
        //        if (formViewDetails != null)
        //        {
        //            DataTable logindt = new DataTable();

        //            logindt = this.context.GetBranch(formViewDetails);


        //            if (logindt.Rows.Count > 0)
        //            {

        //                List<CompanyList> CompanyListnew = new List<CompanyList>();

        //                foreach (DataRow dr in logindt.Rows)
        //                {
        //                    CompanyListnew.Add(new CompanyList
        //                    {

        //                        BranchId = Convert.ToInt32(dr["BranchId"]),
        //                        Name = dr["Name"].ToString()
        //                    });
        //                }


        //                List<AppViewModel> objCompanyList1 = new List<AppViewModel>();
        //                objCompanyList1.Add(new AppViewModel
        //                {
        //                    companyList = CompanyListnew,

        //                });


        //                string JSONString = JsonConvert.SerializeObject(objCompanyList1);

        //                return JSONString;

        //            }
        //            else
        //            {
        //                model = new ResponseViewModel()
        //                {
        //                    Status = "Fail",
        //                    Code = "404",
        //                    Message = "Wrong Username and Password !",

        //                };
        //                newmodel.Add(model);
        //                var CustomizedData = newmodel.Select(e => new
        //                {
        //                    e.Status,
        //                    e.Code,
        //                    e.Message
        //                });

        //                return CustomizedData;
        //            }
        //        }
        //        else
        //        {
        //            model = new ResponseViewModel()
        //            {
        //                Status = "Fail",
        //                Code = "400",
        //                Message = "Request should not be empty."

        //            };

        //            newmodel.Add(model);
        //            var CustomizedData = newmodel.Select(e => new
        //            {
        //                e.Status,
        //                e.Code,
        //                e.Message
        //            });

        //            return CustomizedData;

        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        model = new ResponseViewModel()
        //        {
        //            Status = " ",
        //            Code = "500",
        //            Message = ex.Message,

        //        };
        //        newmodel.Add(model);
        //        var CustomizedData = newmodel.Select(e => new
        //        {
        //            e.Status,
        //            e.Code,
        //            e.Message

        //        });

        //        return CustomizedData;
        //    }
        //}

        public dynamic SaveColumnsDetails(AppViewModel formViewDetails)
        {

            ResponseViewModel model = new ResponseViewModel();

            List<ResponseViewModel> newmodel = new List<ResponseViewModel>();

            try
            {
                //if (formViewDetails != null)
                //{
                DataTable logindt = new DataTable();

                logindt = this.context.SaveColumnsDetails(formViewDetails);

                if (logindt.Rows.Count > 0)
                {
                    return logindt;

                }
                else
                {
                    model = new ResponseViewModel()
                    {
                        Status = "Fail",
                        Code = "404",
                        Message = "Wrong Username and Password !",

                    };
                    newmodel.Add(model);
                    var CustomizedData = newmodel.Select(e => new
                    {
                        e.Status,
                        e.Code,
                        e.Message
                    });

                    return CustomizedData;
                }
            }
            catch (Exception ex)
            {
                model = new ResponseViewModel()
                {
                    Status = " ",
                    Code = "500",
                    Message = ex.Message,

                };
                newmodel.Add(model);
                var CustomizedData = newmodel.Select(e => new
                {
                    e.Status,
                    e.Code,
                    e.Message

                });

                return CustomizedData;
            }
        }
    }
}
