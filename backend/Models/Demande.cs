using System.ComponentModel.DataAnnotations.Schema;

namespace PfeApi.Models
{
    public class Demande
    {
        public int? Id { get; set; }
        public string? Message { get; set; }
        public int? IdTable { get; set; }
        [ForeignKey("IdTable")]
        public Table? Table { get; set; }
    }
}
