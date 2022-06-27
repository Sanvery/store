using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Store.Models;
//using System.Data.Entity;

namespace Store.Contexts
{
    public class MaterialContext : DbContext
    {
        public DbSet<Material> Materials { get; set; }

        public MaterialContext(DbContextOptions<MaterialContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
