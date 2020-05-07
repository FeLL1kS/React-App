﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        
        public string City { get; set; }
        public string Country { get; set; }
    }
}
