using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PfeApi.Migrations
{
    /// <inheritdoc />
    public partial class v12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_commandes_tables_IdTable",
                table: "commandes");

            migrationBuilder.DropForeignKey(
                name: "FK_tables_tirasses_IdTirasse",
                table: "tables");

            migrationBuilder.AddForeignKey(
                name: "FK_commandes_tables_IdTable",
                table: "commandes",
                column: "IdTable",
                principalTable: "tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_tables_tirasses_IdTirasse",
                table: "tables",
                column: "IdTirasse",
                principalTable: "tirasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_commandes_tables_IdTable",
                table: "commandes");

            migrationBuilder.DropForeignKey(
                name: "FK_tables_tirasses_IdTirasse",
                table: "tables");

            migrationBuilder.AddForeignKey(
                name: "FK_commandes_tables_IdTable",
                table: "commandes",
                column: "IdTable",
                principalTable: "tables",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tables_tirasses_IdTirasse",
                table: "tables",
                column: "IdTirasse",
                principalTable: "tirasses",
                principalColumn: "Id");
        }
    }
}
