using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Controllers;

namespace WebAPI.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Password { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Status { get; set; }

        [ForeignKey("LocationId")]
        public int? LocationId { get; set; }
        public Location Location { get; set; }

        [ForeignKey("PhotoId")]
        public int? PhotoId { get; set; }
        public Photos Photo { get; set; }
    }
}
