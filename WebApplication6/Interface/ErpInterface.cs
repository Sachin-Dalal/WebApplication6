using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication6.Models;
using WebApplication6.ViewModel;

namespace WebApplication6.Interface
{
   public interface ErpInterface
    {
        dynamic GetEmp();
        dynamic SaveEmp(EmpDetails obj);
        dynamic UpdateEmp(EmpDetails obj);
        dynamic DeleteEmp(EmpDetails obj);

    }
}
