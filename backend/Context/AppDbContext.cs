using Microsoft.EntityFrameworkCore;

namespace PfeApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Table> Tables { get; set; }
        public DbSet<Tirasse> Tirasses { get; set; }
        public DbSet<LigneCommande> LigneCommandes { get; set; }
        public DbSet<Commande> Commandes { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<FamilleArticle> FamillesArticles { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Administrateur> Administrateurs { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Demande> Demandes { get; set; }
        public DbSet<ListeFavoris> ListeFavoris { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Metadata.GetForeignKeys()
                    .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade)
                    .ToList()
                    .ForEach(fk => fk.DeleteBehavior = DeleteBehavior.Restrict);
            }*/

            modelBuilder.Entity<Client>().ToTable("clients");
            modelBuilder.Entity<Table>().ToTable("tables");
            modelBuilder.Entity<LigneCommande>().ToTable("lignesCommande");
            modelBuilder.Entity<Article>().ToTable("articles");
            modelBuilder.Entity<FamilleArticle>().ToTable("famillesArticles");
            modelBuilder.Entity<Commande>().ToTable("commandes");
            modelBuilder.Entity<Agent>().ToTable("agents");
            modelBuilder.Entity<Administrateur>().ToTable("administrateurs");
            modelBuilder.Entity<Tirasse>().ToTable("tirasses");
            modelBuilder.Entity<Demande>().ToTable("demandes");
            modelBuilder.Entity<ListeFavoris>().ToTable("listeFavoris");

            // Configure Table entity
            modelBuilder.Entity<Table>()
                .HasOne(t => t.Tirasse)
                .WithMany(ta => ta.Tables)
                .HasForeignKey(t => t.IdTirasse)
                .OnDelete(DeleteBehavior.SetNull);

            // Configure Commande entity
            modelBuilder.Entity<Commande>()
            .HasOne(c => c.Client)
            .WithMany(cl => cl.Commandes)
            .HasForeignKey(c => c.IdClient)
            .OnDelete(DeleteBehavior.Cascade);


            // Configure LigneCommande entity
            modelBuilder.Entity<LigneCommande>()
                .HasOne(lc => lc.Commande)
                .WithMany(c => c.LignesCommande)
                .HasForeignKey(lc => lc.IdCommande)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LigneCommande>()
                .HasOne(lc => lc.Article)
                .WithMany(a => a.LignesCommande)
                .HasForeignKey(lc => lc.IdArticle)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Article entity
            modelBuilder.Entity<Article>()
                .HasOne(a => a.Famille)
                .WithMany(fa => fa.Articles)
                .HasForeignKey(a => a.IdFamille)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Agent entity
            modelBuilder.Entity<Agent>()
                .HasOne(a => a.Tirasse)
                .WithOne(t => t.Agent)
                .HasForeignKey<Agent>(a => a.IdTirasse)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Commande>()
                .HasOne(c => c.Table)
                .WithMany(t => t.Commandes)
                .HasForeignKey(c => c.IdTable)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Demande>()
                .HasOne(d => d.Table)
                .WithMany(t => t.Demandes)
                .HasForeignKey(d => d.IdTable)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure listeFavoris entity
            modelBuilder.Entity<ListeFavoris>()
                .HasOne(lf => lf.Client)
                .WithMany(c => c.ListeFavoris)
                .HasForeignKey(lf => lf.IdClient)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ListeFavoris>()
                .HasOne(lf => lf.Article)
                .WithMany(a => a.ListeFavoris)
                .HasForeignKey(lf => lf.IdArticle)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
