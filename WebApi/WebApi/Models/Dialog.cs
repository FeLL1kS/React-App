using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Dialog
    {
        [Key]
        public int Id { get; set; }
        public int firstUserID { get; set; }
        public int secondUserID { get; set; }
        public DateTime DateOfCreation { get; set; }
    }
}
