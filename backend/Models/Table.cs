using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class Table
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string? Numero { get; set; }
        public int? IdTirasse { get; set; }
        [ForeignKey("IdTirasse")]
        public Tirasse? Tirasse { get; set; }
        public ICollection<Commande>? Commandes { get; set; }
        public ICollection<Demande>? Demandes { get; set; }
    }
}
