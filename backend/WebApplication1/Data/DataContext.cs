namespace MsaBackend.Data
{
    /// <summary>
    /// Connect to Database
    /// </summary>
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }
        public DbSet<Product> Products { get; set; }
        public DbSet<Admin> Admins { get; set; }

        // Mapping the database table and fields to the entity class and fields
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>().ToTable("admins");
            modelBuilder.Entity<Product>().ToTable("products");
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    property.SetColumnName(ToSnakeCase(property.GetColumnName()));
                }
            }
        }
        private static string ToSnakeCase(string name)
        {
            return string.Concat(name.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
        }

        // Create trigger to automatically update the update_time and create_time
        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is Product && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((Product)entityEntry.Entity).UpdateTime = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((Product)entityEntry.Entity).CreateTime = DateTime.Now;
                }
            }

            return base.SaveChanges();
        }
    }
}
