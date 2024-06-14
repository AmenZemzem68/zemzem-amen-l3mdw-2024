using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class Tirasse
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string? Nom { get; set; }
        public ICollection<Table>? Tables { get; set; }
        public Agent? Agent { get; set; }
    }
}
