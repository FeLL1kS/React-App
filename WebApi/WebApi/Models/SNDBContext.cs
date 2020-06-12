using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class SNDBContext : DbContext
    {
        public SNDBContext(DbContextOptions<SNDBContext> options)
            : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Photos> Photos { get; set; }
        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Followers> Followers { get; set; }
        public DbSet<Posts> Posts { get; set; }
    }
}
