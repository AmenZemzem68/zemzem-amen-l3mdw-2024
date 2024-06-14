using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PfeApi.Migrations
{
    /// <inheritdoc />
    public partial class v11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_demandes_tables_IdTable",
                table: "demandes");

            migrationBuilder.AddForeignKey(
                name: "FK_demandes_tables_IdTable",
                table: "demandes",
                column: "IdTable",
                principalTable: "tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_demandes_tables_IdTable",
                table: "demandes");

            migrationBuilder.AddForeignKey(
                name: "FK_demandes_tables_IdTable",
                table: "demandes",
                column: "IdTable",
                principalTable: "tables",
                principalColumn: "Id");
        }
    }
}
