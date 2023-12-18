using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication6.Models
{
    public class ResponseViewModel
    {
        public int? Code { get; set; }
        public string Message { get; set; }
        public string DataObject { get; set; }
        public string URL { get; set; }
    }
}
