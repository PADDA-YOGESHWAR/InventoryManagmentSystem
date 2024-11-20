using Inventory_Management_System.Model;
using Microsoft.EntityFrameworkCore;

namespace Inventory_Management_System.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) :base(options) 
        {
                
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Mobile>()
                .Property(m => m.MobilePrice)
                .HasColumnType("decimal(18, 2)");
            modelBuilder.Entity<Order>()
               .Property(m => m.Price)
               .HasColumnType("decimal(18, 2)");
        }
        public DbSet<Mobile> mobiles { get; set; }
        public DbSet<Order> Orders { get; set; }

    }
}
