using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PfeApi.Migrations
{
    /// <inheritdoc />
    public partial class v10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_clients_tables_IdTable",
                table: "clients");

            migrationBuilder.DropIndex(
                name: "IX_clients_IdTable",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "IdTable",
                table: "clients");

            migrationBuilder.AddColumn<int>(
                name: "IdTable",
                table: "commandes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "demandes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdTable = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_demandes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_demandes_tables_IdTable",
                        column: x => x.IdTable,
                        principalTable: "tables",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_commandes_IdTable",
                table: "commandes",
                column: "IdTable");

            migrationBuilder.CreateIndex(
                name: "IX_demandes_IdTable",
                table: "demandes",
                column: "IdTable");

            migrationBuilder.AddForeignKey(
                name: "FK_commandes_tables_IdTable",
                table: "commandes",
                column: "IdTable",
                principalTable: "tables",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_commandes_tables_IdTable",
                table: "commandes");

            migrationBuilder.DropTable(
                name: "demandes");

            migrationBuilder.DropIndex(
                name: "IX_commandes_IdTable",
                table: "commandes");

            migrationBuilder.DropColumn(
                name: "IdTable",
                table: "commandes");

            migrationBuilder.AddColumn<int>(
                name: "IdTable",
                table: "clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_clients_IdTable",
                table: "clients",
                column: "IdTable",
                unique: true,
                filter: "[IdTable] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_clients_tables_IdTable",
                table: "clients",
                column: "IdTable",
                principalTable: "tables",
                principalColumn: "Id");
        }
    }
}
