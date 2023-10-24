using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApplication6.Interface;
using WebApplication6.Models;
using WebApplication6.ViewModel;

namespace WebApplication6.Controllers
{
    public class HomeController : Controller
    {
        private readonly ErpInterface _formData;

        public string UserId = "";
        public HomeController(ErpInterface formData)
        {
            _formData = formData;
        }
        

        public IActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        //public dynamic GetColumnsName([FromBody] AppViewModel formViewDetails)
        //{
        //    ResponseViewModel model = new ResponseViewModel();

        //    List<ResponseViewModel> newmodel = new List<ResponseViewModel>();
        //    dynamic responseModel = new List<ResponseViewModel>();

        //    //dynamic logindt = new DataTable();

        //    try
        //    {
        //        //if (ModelState.IsValid)
        //        //{


        //        //dynamic logindt = _formData.GetColumnsName(formViewDetails);


        //        model = new ResponseViewModel()
        //        {
        //            Status = "Success",
        //            Code = "200",
        //            Message = "Login Successfully !",

        //        };
        //        newmodel.Add(model);
        //        var CustomizedData = newmodel.Select(e => new
        //        {
        //            e.Status,
        //            e.Code,
        //            e.Message
        //        });

        //        //return logindt;
               


        //    }
        //    catch (Exception ex)
        //    {
        //        foreach (var item in responseModel)
        //        {
        //            item.Status = "Error";
        //            item.Description = "Internal Server Error";
        //            item.ErrorCode = HttpContext.Response.StatusCode.ToString();
        //            item.ErrorMessage = ex.Message;
        //            responseModel.Add(item);
        //        }

        //        return responseModel;
        //    }
        //}

        [HttpPost]
        public dynamic SaveColumnsDetails([FromBody] AppViewModel formViewDetails)
        {
            ResponseViewModel model = new ResponseViewModel();

            List<ResponseViewModel> newmodel = new List<ResponseViewModel>();
            dynamic responseModel = new List<ResponseViewModel>();

            DataTable savedt = new DataTable();

            try
            {
                if (ModelState.IsValid)
                {


                    DataTable logindt = _formData.SaveColumnsDetails(formViewDetails);



                    model = new ResponseViewModel()
                    {
                        Status = "Success",
                        Code = "200",
                        Message = "Save Successfully !",

                    };
                    newmodel.Add(model);
                    var CustomizedData = newmodel.Select(e => new
                    {
                        e.Status,
                        e.Code,
                        e.Message
                    });
                    return model;
                }
                else
                {
                    model = new ResponseViewModel()
                    {
                        Status = "Fail",
                        Code = "404",
                        Message = "Request Failed !",

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
                foreach (var item in responseModel)
                {
                    item.Status = "Error";
                    item.Description = "Internal Server Error";
                    item.ErrorCode = HttpContext.Response.StatusCode.ToString();
                    item.ErrorMessage = ex.Message;
                    responseModel.Add(item);
                }

                return responseModel;
            }
        }

    }
}
