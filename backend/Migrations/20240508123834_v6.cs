using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PfeApi.Migrations
{
    /// <inheritdoc />
    public partial class v6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NomUtilisateur",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "NomUtilisateur",
                table: "agents");

            migrationBuilder.DropColumn(
                name: "NomUtilisateur",
                table: "administrateurs");

            migrationBuilder.AddColumn<byte>(
                name: "Image",
                table: "clients",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "Image",
                table: "agents",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "Image",
                table: "administrateurs",
                type: "tinyint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "agents");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "administrateurs");

            migrationBuilder.AddColumn<string>(
                name: "NomUtilisateur",
                table: "clients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NomUtilisateur",
                table: "agents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NomUtilisateur",
                table: "administrateurs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
