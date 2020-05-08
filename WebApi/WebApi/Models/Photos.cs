using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Photos
    {
        [Key]
        public int Id { get; set; }
        
        [Column(TypeName = "varchar(250)")]
        public string FileName { get; set; }

        [Column(TypeName = "varchar(250)")]
        public string FilePath { get; set; }

        [Column(TypeName = "varchar(10)")]
        public string Extension { get; set; }
    }
}
