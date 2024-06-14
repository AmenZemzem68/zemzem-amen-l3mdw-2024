using System.ComponentModel.DataAnnotations.Schema;

namespace PfeApi.Models
{
    public class ListeFavoris
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public int? IdClient { get; set; }
        [ForeignKey("IdClient")]
        public Client? Client { get; set; }
        public int? IdArticle{ get; set; }
        [ForeignKey("IdClient")]
        public Article? Article { get; set; }
    }
}
