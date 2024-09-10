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

        public dynamic GetEmp()
        {
            EmpDetails opdModel = new EmpDetails();
            List<EmpDetails> newopdModel = new List<EmpDetails>();

            ResponseViewModel model = new ResponseViewModel();
            List<ResponseViewModel> newmodel = new List<ResponseViewModel>();

            try
            {
                DataTable result = this.context.GetEmp();

                if (result.Rows.Count > 0)
                {

                    for (int i = 0; i < result.Rows.Count; i++)
                    {
                        opdModel = new EmpDetails()
                        {
                            EmpId = Convert.ToInt32(result.Rows[i]["EmpId"].ToString()),
                            EmpCode = Convert.ToInt32(result.Rows[i]["EmpCode"].ToString()),
                            EmpName = result.Rows[i]["EmpName"].ToString(),
                            DOB = result.Rows[i]["DOB"].ToString(),
                            Gender = Convert.ToInt32(result.Rows[i]["Gender"].ToString()),
                            Department = result.Rows[i]["Department"].ToString(),
                            Designation = result.Rows[i]["Designation"].ToString(),
                            BasicSalary = result.Rows[i]["BasicSalary"].ToString(),
                        
                            Code = 200,
                            Message = "Success"
                        };

                        newopdModel.Add(opdModel);
                    }

                    var CustomizeduserData = newopdModel.Select(e => new
                    {
                        e.EmpId,
                        e.EmpCode,
                        e.EmpName,
                        e.DOB,
                        e.Gender,
                        e.Department,
                        e.Designation,
                        e.BasicSalary,
                        e.Code,
                        e.Message

                    });
                    return CustomizeduserData;
                }
                else
                {
                    model = new ResponseViewModel()
                    {
                        Code = 404,
                        Message = "No Record Found !",

                    };
                    newmodel.Add(model);
                    var CustomizeduserData = newmodel.Select(e => new
                    {
                        e.Code,
                        e.Message
                    });

                    return CustomizeduserData;
                }
            }
            catch (Exception ex)
            {
                model = new ResponseViewModel()
                {
                    Code = 500,
                    Message = ex.Message,

                };
                newmodel.Add(model);
                var CustomizedloginData = newmodel.Select(e => new
                {
                    e.Code,
                    e.Message

                });

                return CustomizedloginData;
            }
        }
        public dynamic SaveEmp(EmpDetails obj)
        {

            EmpDetails model = new EmpDetails();
            List<EmpDetails> newmodel = new List<EmpDetails>();

            ResponseViewModel resviewmodel = new ResponseViewModel();
            List<ResponseViewModel> newresviewmodel = new List<ResponseViewModel>();

            try
            {
                dynamic result = this.context.SaveEmp(obj);

                if (Convert.ToInt32(result) > 0)
                {
                    model = new EmpDetails()
                    {
                        Code = 200,
                        Message = "Employee Save Successfully.",

                    };
                    newmodel.Add(model);
                }
                else
                {
                    model = new EmpDetails()
                    {
                        Code = 404,
                        Message = "Employee Save Process Failed !",

                    };
                    newmodel.Add(model);
                }

                var CustomizedData = newmodel.Select(e => new
                {
                    e.Code,
                    e.Message
                });


                return CustomizedData;


            }
            catch (Exception ex)
            {
                resviewmodel = new ResponseViewModel()
                {
                    Code = 500,
                    Message = ex.Message,

                };
                newresviewmodel.Add(resviewmodel);
                var CustomizedData = newresviewmodel.Select(e => new
                {
                    e.Code,
                    e.Message

                });

                return CustomizedData;
            }
        }
        public dynamic UpdateEmp(EmpDetails obj)
        {

            EmpDetails model = new EmpDetails();
            List<EmpDetails> newmodel = new List<EmpDetails>();

            ResponseViewModel resviewmodel = new ResponseViewModel();
            List<ResponseViewModel> newresviewmodel = new List<ResponseViewModel>();

            try
            {
                dynamic result = this.context.UpdateEmp(obj);

                if (Convert.ToInt32(result) > 0)
                {
                    model = new EmpDetails()
                    {
                        Code = 200,
                        Message = "Employee Update Successfully.",

                    };
                    newmodel.Add(model);
                }
                else
                {
                    model = new EmpDetails()
                    {
                        Code = 404,
                        Message = "Employee Updation Process Failed !",

                    };
                    newmodel.Add(model);
                }

                var CustomizedData = newmodel.Select(e => new
                {
                    e.Code,
                    e.Message
                });


                return CustomizedData;


            }
            catch (Exception ex)
            {
                resviewmodel = new ResponseViewModel()
                {
                    Code = 500,
                    Message = ex.Message,

                };
                newresviewmodel.Add(resviewmodel);
                var CustomizedData = newresviewmodel.Select(e => new
                {
                    e.Code,
                    e.Message

                });

                return CustomizedData;
            }
        }
        public dynamic DeleteEmp(EmpDetails obj)
        {

            EmpDetails model = new EmpDetails();
            List<EmpDetails> newmodel = new List<EmpDetails>();

            ResponseViewModel resviewmodel = new ResponseViewModel();
            List<ResponseViewModel> newresviewmodel = new List<ResponseViewModel>();

            try
            {
                dynamic result = this.context.DeleteEmp(obj);

                if (Convert.ToInt32(result) > 0)
                {
                    model = new EmpDetails()
                    {
                        Code = 200,
                        Message = "Employee Delete Successfully.",

                    };
                    newmodel.Add(model);
                }
                else
                {
                    model = new EmpDetails()
                    {
                        Code = 404,
                        Message = "Employee Deletion Process Failed !",

                    };
                    newmodel.Add(model);
                }

                var CustomizedData = newmodel.Select(e => new
                {
                    e.Code,
                    e.Message
                });


                return CustomizedData;


            }
            catch (Exception ex)
            {
                resviewmodel = new ResponseViewModel()
                {
                    Code = 500,
                    Message = ex.Message,

                };
                newresviewmodel.Add(resviewmodel);
                var CustomizedData = newresviewmodel.Select(e => new
                {
                    e.Code,
                    e.Message

                });

                return CustomizedData;
            }
        }



    }
}
