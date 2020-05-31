using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.ViewModel
{
    public class RegisterModel
    {
        #region User
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int LocationId { get; set; }
        #endregion
        #region Profile
        public bool LookingForAJob { get; set; }
        public string LookingForAJobDescription { get; set; }
        public Contacts Contacts { get; set; }
        #endregion
    }
}
