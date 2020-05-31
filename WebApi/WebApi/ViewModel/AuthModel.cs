using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.ViewModel
{
    public class AuthModel
    {
        public int ResultCode { get; set; }
        public string Messages { get; set; }
        public string Data { get; set; }
    }
}
