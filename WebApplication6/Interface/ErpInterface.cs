using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication6.ViewModel;

namespace WebApplication6.Interface
{
   public interface ErpInterface
    {
        //dynamic Login(AppViewModel formViewDetails);
        dynamic SaveColumnsDetails(AppViewModel formViewDetails);

    }
}
