using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.Migrations
{
    public partial class InitialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    vId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vImage = table.Column<string>(nullable: true),
                    vNameBuildingMaterial = table.Column<string>(nullable: true),
                    vCatalog = table.Column<string>(nullable: true),
                    vBrand = table.Column<string>(nullable: true),
                    vPrice = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.vId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Materials");
        }
    }
}
