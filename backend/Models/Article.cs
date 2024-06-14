using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class Article
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string? Libelle { get; set; }
        public double? PrixVente { get; set; }
        public int? IdFamille { get; set; }
        [ForeignKey("IdFamille")]
        public FamilleArticle? Famille { get; set; }
        public byte[]? Image { get; set; }
        public string? Description { get; set; }
        public ICollection<LigneCommande>? LignesCommande { get; set; }
        public ICollection<ListeFavoris>? ListeFavoris { get; set; }
    }
}
