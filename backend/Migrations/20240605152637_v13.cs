using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PfeApi.Migrations
{
    /// <inheritdoc />
    public partial class v13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "pointsFidelité",
                table: "clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "listeFavoris",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdClient = table.Column<int>(type: "int", nullable: true),
                    IdArticle = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_listeFavoris", x => x.Id);
                    table.ForeignKey(
                        name: "FK_listeFavoris_articles_IdArticle",
                        column: x => x.IdArticle,
                        principalTable: "articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_listeFavoris_clients_IdClient",
                        column: x => x.IdClient,
                        principalTable: "clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_listeFavoris_IdArticle",
                table: "listeFavoris",
                column: "IdArticle");

            migrationBuilder.CreateIndex(
                name: "IX_listeFavoris_IdClient",
                table: "listeFavoris",
                column: "IdClient");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "listeFavoris");

            migrationBuilder.DropColumn(
                name: "pointsFidelité",
                table: "clients");
        }
    }
}
