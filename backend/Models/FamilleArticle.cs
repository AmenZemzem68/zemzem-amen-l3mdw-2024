using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class FamilleArticle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public byte[]? Image { get; set; }
        public string? Libelle { get; set; }
        public ICollection<Article>? Articles { get; set; }
    }
}
