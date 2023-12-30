using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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

        public HomeController(ErpInterface formData)
        {
            _formData = formData;
        }

        private const string JsonFilePath = @"CertificateData/CertificateData.json";


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create_Certificate()
        {
            return View();
        }

        public IActionResult Download_Certificate(string Name, string Date)
        {

            ViewData["Name"] = Name;
            ViewData["Date"] = Date;

            return View();
        }



        public IActionResult Add_Emp()
        {
            ViewData["CurrentView"] = "Add Employee";
            return View();
        }

        [HttpPost]
        public async Task<dynamic> GetEmp()
        {
            ResponseViewModel responseViewModel = new ResponseViewModel();
            List<ResponseViewModel> newresponseViewModel = new List<ResponseViewModel>();
            dynamic responseModel = new List<ResponseViewModel>();
            dynamic EmpResponse = new List<EmpDetails>();

            try
            {

                await Task.Run(() =>
                {
                    EmpResponse = _formData.GetEmp();
                });

                string Emp_String = JsonConvert.SerializeObject(EmpResponse);
                dynamic Emp_Json = JsonConvert.DeserializeObject(Emp_String);

                int ResponseCode = Emp_Json[0].Code;

                if (ResponseCode == 200)
                {
                    responseViewModel = new ResponseViewModel()
                    {
                        Code = 200,
                        DataObject = Emp_String,
                        Message = "Success."
                    };
                }
                else
                {
                    responseViewModel = new ResponseViewModel()
                    {
                        Code = Emp_Json[0].Code,
                        DataObject = Emp_String,
                        Message = Emp_Json[0].Message
                    };
                }


                newresponseViewModel.Add(responseViewModel);

                return newresponseViewModel;
            }
            catch (Exception ex)
            {
                foreach (var item in responseModel)
                {
                    item.status = "Error";
                    item.code = HttpContext.Response.StatusCode.ToString();
                    item.message = ex.Message;
                    responseModel.Add(item);
                }

                return responseModel;
            }
        }

        [HttpPost]
        public async Task<dynamic> SaveEmp([FromBody] EmpDetails obj)
        {
            dynamic responseModel = new List<ResponseViewModel>();
            dynamic Response = new List<EmpDetails>();
            string Message = "";
            int Code;

            try
            {

                if (obj != null)
                {
                    await Task.Run(() =>
                    {
                        Response = _formData.SaveEmp(obj);
                    });

                    string responsestring = JsonConvert.SerializeObject(Response);
                    dynamic responsejson = JsonConvert.DeserializeObject(responsestring);

                    int ResponseCode = responsejson[0].Code;
                    Code = responsejson[0].Code;
                    Message = responsejson[0].Message;

                    return Json(new
                    {
                        Code = Code,
                        Message = Message,
                    });

                }
                else
                {
                    return Json(new
                    {
                        Code = 404,
                        Message = "Please Enter Employee Information !",
                    });
                }

            }
            catch (Exception ex)
            {
                foreach (var item in responseModel)
                {
                    item.Code = HttpContext.Response.StatusCode.ToString();
                    item.Message = ex.Message;
                    responseModel.Add(item);
                }

                return responseModel;
            }
        }

        [HttpPost]
        public async Task<dynamic> UpdateEmp([FromBody] EmpDetails obj)
        {
            dynamic responseModel = new List<ResponseViewModel>();
            dynamic Response = new List<EmpDetails>();
            string Message = "";
            int Code;

            try
            {

                if (obj != null)
                {
                    await Task.Run(() =>
                    {
                        Response = _formData.UpdateEmp(obj);
                    });

                    string responsestring = JsonConvert.SerializeObject(Response);
                    dynamic responsejson = JsonConvert.DeserializeObject(responsestring);

                    int ResponseCode = responsejson[0].Code;
                    Code = responsejson[0].Code;
                    Message = responsejson[0].Message;

                    return Json(new
                    {
                        Code = Code,
                        Message = Message,
                    });

                }
                else
                {
                    return Json(new
                    {
                        Code = 404,
                        Message = "Please Enter Employee Information !",
                    });
                }

            }
            catch (Exception ex)
            {
                foreach (var item in responseModel)
                {
                    item.Code = HttpContext.Response.StatusCode.ToString();
                    item.Message = ex.Message;
                    responseModel.Add(item);
                }

                return responseModel;
            }
        }

        [HttpPost]
        public async Task<dynamic> DeleteEmp([FromBody] EmpDetails obj)
        {
            dynamic responseModel = new List<ResponseViewModel>();
            dynamic Response = new List<EmpDetails>();
            string Message = "";
            int Code;

            try
            {
                if (obj != null)
                {
                    await Task.Run(() =>
                    {
                        Response = _formData.DeleteEmp(obj);
                    });

                    string responsestring = JsonConvert.SerializeObject(Response);
                    dynamic responsejson = JsonConvert.DeserializeObject(responsestring);

                    int ResponseCode = responsejson[0].Code;
                    Code = responsejson[0].Code;
                    Message = responsejson[0].Message;

                    return Json(new
                    {
                        Code = Code,
                        Message = Message,
                    });

                }
                else
                {
                    return Json(new
                    {
                        Code = 404,
                        Message = "Please Enter Employee Information !",
                    });
                }

            }
            catch (Exception ex)
            {
                foreach (var item in responseModel)
                {
                    item.Code = HttpContext.Response.StatusCode.ToString();
                    item.Message = ex.Message;
                    responseModel.Add(item);
                }

                return responseModel;
            }
        }

        [HttpPost]
        public async Task<dynamic> GenerateCertificate([FromBody] CertificateDetails newData)
        {
            CertificateDetails certificateDetails = new CertificateDetails();
            List<CertificateDetails> newcertificateDetails = new List<CertificateDetails>();

            Response response = new Response();
            List<Response> newResponse = new List<Response>();

            newcertificateDetails = LoadDataFromJson();

            if(newcertificateDetails == null)
            {
                List<CertificateDetails> _certificateDetails = new List<CertificateDetails>();
                certificateDetails = new CertificateDetails()
                {
                    Name = newData.Name,
                    EmailId = newData.EmailId,
                    Mobile = newData.Mobile,
                    CurrentDate = newData.CurrentDate
                };

                _certificateDetails.Add(certificateDetails);

                SaveDataToJson(_certificateDetails, false);

                ViewData["Name"] = newData.Name;
                ViewData["Date"] = newData.CurrentDate;

                response = new Response()
                {
                    Code = 200,
                };

                newResponse.Add(response);
            }
            else
            {
                if (newcertificateDetails.Any(d => (d.Name == newData.Name && d.Mobile == newData.Mobile) || (d.Name == newData.Name && d.EmailId == newData.EmailId) || (d.Mobile == newData.Mobile && d.EmailId == newData.EmailId)))
                {

                    response = new Response()
                    {
                        Code = 400,
                    };

                    newResponse.Add(response);
                }
                else
                {
                    newcertificateDetails.Add(newData);
                    SaveDataToJson(newcertificateDetails, true);

                    ViewData["Name"] = newData.Name;
                    ViewData["Date"] = newData.CurrentDate;

                    response = new Response()
                    {
                        Code = 200,
                    };

                    newResponse.Add(response);
                }      
            }

            return newResponse;
        }

        private List<CertificateDetails> LoadDataFromJson()
        {
            if (System.IO.File.Exists(JsonFilePath))
            {
                string jsonData = System.IO.File.ReadAllText(JsonFilePath);
                return JsonConvert.DeserializeObject<List<CertificateDetails>>(jsonData);
            }
            return new List<CertificateDetails>();
        }

        private void SaveDataToJson(List<CertificateDetails> data, bool exist)
        {
            string jsonData = JsonConvert.SerializeObject(data, Formatting.Indented);
            System.IO.File.WriteAllText(JsonFilePath, jsonData);

        }

    }
}
