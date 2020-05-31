using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.ViewModel
{
    public class ProfileModel
    {
        public int UserId { get; set; }
        public bool LookingForAJob { get; set; }
        public string LookingForAJobDescription { get; set; }
        public string FullName { get; set; }
        public string Status { get; set; }
        public Contacts Contacts { get; set; }
        public string Photo { get; set; }
        public string Error { get; set; }
    }
}
