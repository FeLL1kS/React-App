using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.ViewModel
{
    public class UserModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public bool? Followed { get; set; }
        public Location Location { get; set; }
        public string Photo { get; set; }
    }
}
