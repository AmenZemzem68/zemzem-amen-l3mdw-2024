using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PfeApi.Models
{
    public class Client
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
        public string? ResetPasswordToken { get; set; }
        public DateTime ResetPasswordExpiry { get; set; }
        public byte[]? Image { get; set; }
        public int? pointsFidelité { get; set; }
        public ICollection<Commande>? Commandes { get; set; }
        public ICollection<ListeFavoris>? ListeFavoris { get; set; }
    }
}
