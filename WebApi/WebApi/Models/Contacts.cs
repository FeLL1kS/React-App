using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Contacts
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Github { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Vk { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Facebook { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Instagram { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Twitter { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Website { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Youtube { get; set; }
    }
}
