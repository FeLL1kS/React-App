using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.ViewModel
{
    public class ResultModel<T>
    {
        public int ResultCode { get; set; }
        public string Messages { get; set; }
        public T Data { get; set; }
    }
}
