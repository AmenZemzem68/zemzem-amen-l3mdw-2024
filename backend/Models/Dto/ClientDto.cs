namespace PfeApi.Models.Dto
{
    public class ClientDto
    {
        public int? Id { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? MotDePasse { get; set; }
        public IFormFile? Image { get; set; }
    }

}
