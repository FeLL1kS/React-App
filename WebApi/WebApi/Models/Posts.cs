using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Posts
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public int? UserId { get; set; }
        public Users User { get; set; }

        [Column(TypeName = "text")]
        public string Post { get; set; }
        
        [Column(TypeName = "int")]
        public int CountLikes { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime PostDate { get; set; }
    }
}
