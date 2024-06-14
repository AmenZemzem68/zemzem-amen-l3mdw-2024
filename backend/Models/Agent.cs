using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PfeApi.Models
{
    public class Agent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? MotDePasse { get; set; }
        public string? Token { get; set; }
        public byte[]? Image { get; set; }
        public int? IdTirasse { get; set; }
        [ForeignKey("IdTirasse")]
        public Tirasse? Tirasse { get; set; }
    }
}
