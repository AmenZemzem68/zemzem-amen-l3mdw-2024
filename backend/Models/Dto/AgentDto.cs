namespace PfeApi.Models.Dto
{
    public class AgentDto
    {
        public int? Id { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? Telephone { get; set; }
        public string? MotDePasse { get; set; }
        public int? IdTirasse { get; set; }
        public IFormFile? Image { get; set; }
    }
}
