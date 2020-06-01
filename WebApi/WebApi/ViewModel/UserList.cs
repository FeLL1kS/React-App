using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.ViewModel
{
    public class UserList
    {
        public List<UserModel> users;
        public int TotalPages { get; set; }
    }
}
