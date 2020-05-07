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
        public string Status { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string PhotoPath { get; set; }

        [Column(TypeName = "bit")]
        public bool Followed { get; set; }

        [ForeignKey("LocationId")]
        public int? LocationId { get; set; }
        public Location Location { get; set; }
    }
}
