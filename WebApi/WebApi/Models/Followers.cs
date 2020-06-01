using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Followers
    {
        public int Id { get; set; }
        public int CurrentUser { get; set; }
        public int RequestedUser { get; set; }
    }
}
