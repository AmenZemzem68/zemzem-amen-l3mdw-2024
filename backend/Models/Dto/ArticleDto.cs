using System.ComponentModel.DataAnnotations.Schema;

namespace PfeApi.Models.Dto
{
    public class ArticleDto
    {
        public int? Id { get; set; }
        public string? Libelle { get; set; }
        public double? PrixVente { get; set; }
        public int? IdFamille { get; set; }
        public IFormFile? Image { get; set; }
        public string? Description { get; set; }
    }
}
