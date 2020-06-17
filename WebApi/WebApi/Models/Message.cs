using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("DialogId")]
        public int? DialogId { get; set; }
        public Dialog Dialog { get; set; }

        public int UserId { get; set; }

        [Column(TypeName = "text")]
        public string Content { get; set; }

        public DateTime DateCreated { get; set; }
        
        public bool IsRead { get; set; }
    }
}
