using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }

        public bool LookingForAJob { get; set; }

        [Column(TypeName = "varchar(300)")]
        public string LookingForAJobDescription { get; set; }

        [ForeignKey("ContactsId")]
        public int? ContactsId { get; set; }
        public Contacts Contacts { get; set; }

        [ForeignKey("UserId")]
        public int? UserId { get; set; }
        public Users User { get; set; }
    }
}
