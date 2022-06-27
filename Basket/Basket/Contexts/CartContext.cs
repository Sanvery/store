using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Basket.Models;

namespace Basket.Contexts
{
    public class CartContext : DbContext
    {
        public DbSet<Material> Materials { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }

        public CartContext(DbContextOptions<CartContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
