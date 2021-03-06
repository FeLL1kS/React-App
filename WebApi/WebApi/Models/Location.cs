﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        
        [Column(TypeName = "varchar(250)")]
        public string City { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string Country { get; set; }
    }
}
