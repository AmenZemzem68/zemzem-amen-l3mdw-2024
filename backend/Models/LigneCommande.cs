using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class LigneCommande
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public int? Quantite { get; set; }
        public double? PrixUnitaire { get; set; }
        public int? IdCommande { get; set; }
        [ForeignKey("IdCommande")]
        public Commande? Commande { get; set; }
        public int? IdArticle { get; set; }
        [ForeignKey("IdArticle")]
        public Article? Article { get; set; }
        public string? Note { get; set; }
    }
}
