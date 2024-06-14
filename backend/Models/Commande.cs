using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class Commande
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public DateTime? DateCommande { get; set; }
        public ICollection<LigneCommande>? LignesCommande { get; set; }
        public int? IdClient { get; set; }
        [ForeignKey("IdClient")]
        public Client? Client { get; set; }
        public double? PrixTotal { get; set; }
        public string? Etat {  get; set; }
        public int? IdTable { get; set; }
        [ForeignKey("IdTable")]
        public Table? Table { get; set; }
    }
}
