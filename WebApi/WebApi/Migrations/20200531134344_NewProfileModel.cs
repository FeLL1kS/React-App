using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class NewProfileModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Profiles");

            migrationBuilder.RenameColumn(
                name: "LookingForAJobDesription",
                table: "Profiles",
                newName: "LookingForAJobDescription");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LookingForAJobDescription",
                table: "Profiles",
                newName: "LookingForAJobDesription");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Profiles",
                type: "varchar(100)",
                nullable: true);
        }
    }
}
