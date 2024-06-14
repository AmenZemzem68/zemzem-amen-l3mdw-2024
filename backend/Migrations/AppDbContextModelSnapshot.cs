﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PfeApi.Models;

#nullable disable

namespace PfeApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0-preview.3.24172.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PfeApi.Models.Administrateur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("MotDePasse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("administrateurs", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Agent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdTirasse")
                        .HasColumnType("int");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("MotDePasse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdTirasse")
                        .IsUnique()
                        .HasFilter("[IdTirasse] IS NOT NULL");

                    b.ToTable("agents", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdFamille")
                        .HasColumnType("int");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Libelle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("PrixVente")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("IdFamille");

                    b.ToTable("articles", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("MotDePasse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ResetPasswordExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("pointsFidelité")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("clients", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Commande", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DateCommande")
                        .HasColumnType("datetime2");

                    b.Property<string>("Etat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdClient")
                        .HasColumnType("int");

                    b.Property<int?>("IdTable")
                        .HasColumnType("int");

                    b.Property<double?>("PrixTotal")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("IdClient");

                    b.HasIndex("IdTable");

                    b.ToTable("commandes", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Demande", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("IdTable")
                        .HasColumnType("int");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdTable");

                    b.ToTable("demandes", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.FamilleArticle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Libelle")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("famillesArticles", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.LigneCommande", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("IdArticle")
                        .HasColumnType("int");

                    b.Property<int?>("IdCommande")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("PrixUnitaire")
                        .HasColumnType("float");

                    b.Property<int?>("Quantite")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdArticle");

                    b.HasIndex("IdCommande");

                    b.ToTable("lignesCommande", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.ListeFavoris", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("IdArticle")
                        .HasColumnType("int");

                    b.Property<int?>("IdClient")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdArticle");

                    b.HasIndex("IdClient");

                    b.ToTable("listeFavoris", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Table", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("IdTirasse")
                        .HasColumnType("int");

                    b.Property<string>("Numero")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdTirasse");

                    b.ToTable("tables", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Tirasse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tirasses", (string)null);
                });

            modelBuilder.Entity("PfeApi.Models.Agent", b =>
                {
                    b.HasOne("PfeApi.Models.Tirasse", "Tirasse")
                        .WithOne("Agent")
                        .HasForeignKey("PfeApi.Models.Agent", "IdTirasse")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Tirasse");
                });

            modelBuilder.Entity("PfeApi.Models.Article", b =>
                {
                    b.HasOne("PfeApi.Models.FamilleArticle", "Famille")
                        .WithMany("Articles")
                        .HasForeignKey("IdFamille")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Famille");
                });

            modelBuilder.Entity("PfeApi.Models.Commande", b =>
                {
                    b.HasOne("PfeApi.Models.Client", "Client")
                        .WithMany("Commandes")
                        .HasForeignKey("IdClient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PfeApi.Models.Table", "Table")
                        .WithMany("Commandes")
                        .HasForeignKey("IdTable")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Client");

                    b.Navigation("Table");
                });

            modelBuilder.Entity("PfeApi.Models.Demande", b =>
                {
                    b.HasOne("PfeApi.Models.Table", "Table")
                        .WithMany("Demandes")
                        .HasForeignKey("IdTable")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Table");
                });

            modelBuilder.Entity("PfeApi.Models.LigneCommande", b =>
                {
                    b.HasOne("PfeApi.Models.Article", "Article")
                        .WithMany("LignesCommande")
                        .HasForeignKey("IdArticle")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PfeApi.Models.Commande", "Commande")
                        .WithMany("LignesCommande")
                        .HasForeignKey("IdCommande")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Article");

                    b.Navigation("Commande");
                });

            modelBuilder.Entity("PfeApi.Models.ListeFavoris", b =>
                {
                    b.HasOne("PfeApi.Models.Article", "Article")
                        .WithMany("ListeFavoris")
                        .HasForeignKey("IdArticle")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PfeApi.Models.Client", "Client")
                        .WithMany("ListeFavoris")
                        .HasForeignKey("IdClient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Article");

                    b.Navigation("Client");
                });

            modelBuilder.Entity("PfeApi.Models.Table", b =>
                {
                    b.HasOne("PfeApi.Models.Tirasse", "Tirasse")
                        .WithMany("Tables")
                        .HasForeignKey("IdTirasse")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Tirasse");
                });

            modelBuilder.Entity("PfeApi.Models.Article", b =>
                {
                    b.Navigation("LignesCommande");

                    b.Navigation("ListeFavoris");
                });

            modelBuilder.Entity("PfeApi.Models.Client", b =>
                {
                    b.Navigation("Commandes");

                    b.Navigation("ListeFavoris");
                });

            modelBuilder.Entity("PfeApi.Models.Commande", b =>
                {
                    b.Navigation("LignesCommande");
                });

            modelBuilder.Entity("PfeApi.Models.FamilleArticle", b =>
                {
                    b.Navigation("Articles");
                });

            modelBuilder.Entity("PfeApi.Models.Table", b =>
                {
                    b.Navigation("Commandes");

                    b.Navigation("Demandes");
                });

            modelBuilder.Entity("PfeApi.Models.Tirasse", b =>
                {
                    b.Navigation("Agent");

                    b.Navigation("Tables");
                });
#pragma warning restore 612, 618
        }
    }
}
