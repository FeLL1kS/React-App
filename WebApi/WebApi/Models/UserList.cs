using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class UserList
    {
        public List<Users> users;
        public int TotalPages { get; set; }
    }
}
